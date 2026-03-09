package org.example.demospring.service;

import org.example.demospring.dto.request.SearchByIngredientsRequest;
import org.example.demospring.dto.response.PaginatedResponse;
import org.example.demospring.dto.response.ProductDetailResponse;
import org.example.demospring.entity.Ingredient;
import org.example.demospring.entity.Product;
import org.example.demospring.entity.Recipe;

import java.util.List;

public interface ProductService {
    // Basic Admin APIs (for testing/filling data)
    Product addProduct(Long restaurantId, Product product);

    Ingredient addIngredient(Ingredient ingredient);

    Recipe addRecipe(Long productId, Long ingredientId, Float quantity);

    // Core Logic (Smart Search)
    PaginatedResponse<ProductDetailResponse> searchProductsByName(String keyword, Integer maxCookingTime,
            Integer minCalories, Integer maxCalories, List<String> tags, int page, int size);

    List<ProductDetailResponse> searchProductsByIngredients(SearchByIngredientsRequest request);

    ProductDetailResponse getProductById(Long id);

    List<ProductDetailResponse> getAiRecommendedProducts();
}
