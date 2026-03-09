package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.request.SearchByIngredientsRequest;
import org.example.demospring.dto.response.ProductDetailResponse;
import org.example.demospring.entity.Ingredient;
import org.example.demospring.entity.Product;
import org.example.demospring.entity.Recipe;
import org.example.demospring.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    // --- Admin Endpoints (for adding data) ---
    @PostMapping("/admin/restaurant/{restaurantId}/add")
    public ResponseEntity<Product> addProduct(@PathVariable Long restaurantId, @RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(restaurantId, product));
    }

    @PostMapping("/admin/ingredient")
    public ResponseEntity<Ingredient> addIngredient(@RequestBody Ingredient ingredient) {
        return ResponseEntity.ok(productService.addIngredient(ingredient));
    }

    @PostMapping("/admin/recipe/{productId}/{ingredientId}")
    public ResponseEntity<Recipe> addRecipe(
            @PathVariable Long productId,
            @PathVariable Long ingredientId,
            @RequestParam Float quantity) {
        return ResponseEntity.ok(productService.addRecipe(productId, ingredientId, quantity));
    }

    // --- Core Features: Search ---

    @GetMapping("/search")
    public ResponseEntity<List<ProductDetailResponse>> searchByName(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProductsByName(keyword));
    }

    @GetMapping("/ai-recommended")
    public ResponseEntity<List<ProductDetailResponse>> getAiRecommendedProducts() {
        return ResponseEntity.ok(productService.getAiRecommendedProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping("/smart-search")
    public ResponseEntity<List<ProductDetailResponse>> searchByIngredients(
            @RequestBody SearchByIngredientsRequest request) {
        return ResponseEntity.ok(productService.searchProductsByIngredients(request));
    }
}
