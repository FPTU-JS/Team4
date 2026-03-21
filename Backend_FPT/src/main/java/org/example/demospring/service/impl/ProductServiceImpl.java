package org.example.demospring.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.request.SearchByIngredientsRequest;
import org.example.demospring.dto.response.ProductDetailResponse;
import org.example.demospring.entity.Ingredient;
import org.example.demospring.entity.Product;
import org.example.demospring.entity.Recipe;
import org.example.demospring.entity.Restaurant;
import org.example.demospring.repository.IngredientRepository;
import org.example.demospring.repository.ProductRepository;
import org.example.demospring.repository.RecipeRepository;
import org.example.demospring.repository.RestaurantRepository;
import org.example.demospring.service.ProductService;
import org.example.demospring.repository.spec.ProductSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.example.demospring.dto.response.PaginatedResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    public Product addProduct(Long restaurantId, Product product) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        product.setRestaurant(restaurant);
        return productRepository.save(product);
    }

    @Override
    public Ingredient addIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    @Override
    public Recipe addRecipe(Long productId, Long ingredientId, Float quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));

        Recipe recipe = Recipe.builder()
                .product(product)
                .ingredient(ingredient)
                .quantity(quantity)
                .build();
        return recipeRepository.save(recipe);
    }

    @Override
    public PaginatedResponse<ProductDetailResponse> searchProductsByName(String keyword, Integer maxCookingTime,
            Integer minCalories, Integer maxCalories, List<String> tags, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Specification<Product> spec = ProductSpecification.filterBy(keyword, maxCookingTime, minCalories, maxCalories,
                tags);
        Page<Product> productPage = productRepository.findAll(spec, pageable);

        List<ProductDetailResponse> content = productPage.getContent()
                .stream()
                .map(this::mapToDetailResponse)
                .collect(Collectors.toList());

        return PaginatedResponse.<ProductDetailResponse>builder()
                .content(content)
                .currentPage(productPage.getNumber() + 1)
                .totalPages(productPage.getTotalPages())
                .totalElements(productPage.getTotalElements())
                .size(productPage.getSize())
                .build();
    }

    @Override
    public List<ProductDetailResponse> searchProductsByIngredients(SearchByIngredientsRequest request) {
        if (request.getIngredientNames() == null || request.getIngredientNames().isEmpty()) {
            return Collections.emptyList();
        }

        // 1. Find Ingredient IDs by names
        List<Ingredient> ingredients = ingredientRepository.findByNameIn(request.getIngredientNames());
        List<Long> ingredientIds = ingredients.stream().map(Ingredient::getId).collect(Collectors.toList());

        if (ingredientIds.isEmpty()) {
            return Collections.emptyList();
        }

        // 2. Find Recipes that contain ANY of these ingredients
        List<Recipe> relatedRecipes = recipeRepository.findByIngredientIdIn(ingredientIds);

        // 3. Group by Product ID and count matches
        Map<Long, Long> productMatchCount = relatedRecipes.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getProduct().getId(),
                        Collectors.counting()));

        // 4. Sort Product IDs by number of matched ingredients (descending)
        List<Long> sortedProductIds = productMatchCount.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // 5. Fetch Products and Map to Response
        List<ProductDetailResponse> result = new ArrayList<>();
        for (Long pid : sortedProductIds) {
            productRepository.findById(pid).ifPresent(product -> {
                result.add(mapToDetailResponse(product));
            });
        }

        return result;
    }

    @Override
    public ProductDetailResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return mapToDetailResponse(product);
    }

    @Override
    public List<ProductDetailResponse> getAiRecommendedProducts() {
        List<Product> products = productRepository.findByIsAiRecommendedTrue();
        return products.stream().map(this::mapToDetailResponse).collect(Collectors.toList());
    }

    private ProductDetailResponse mapToDetailResponse(Product product) {
        List<Recipe> recipes = recipeRepository.findByProductId(product.getId());

        List<ProductDetailResponse.RecipeDetail> recipeDetails = recipes.stream()
                .map(r -> ProductDetailResponse.RecipeDetail.builder()
                        .ingredientId(r.getIngredient().getId())
                        .ingredientName(r.getIngredient().getName())
                        .unit(r.getIngredient().getUnit())
                        .quantity(r.getQuantity())
                        .build())
                .collect(Collectors.toList());

        List<String> tagsList = new ArrayList<>();
        if (product.getTags() != null && !product.getTags().isEmpty()) {
            tagsList = Arrays.asList(product.getTags().split("\\s*,\\s*"));
        }

        return ProductDetailResponse.builder()
                .productId(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .restaurantName(product.getRestaurant() != null ? product.getRestaurant().getName() : "Unknown")
                .cookingTime(product.getCookingTime())
                .calories(product.getCalories())
                .rating(product.getRating())
                .isAiRecommended(product.getIsAiRecommended())
                .tags(tagsList)
                .dietaryPreferences(product.getDietaryPreferences())
                .recipes(recipeDetails)
                .latitude(product.getRestaurant() != null ? product.getRestaurant().getLatitude() : null)
                .longitude(product.getRestaurant() != null ? product.getRestaurant().getLongitude() : null)
                .build();
    }
}
