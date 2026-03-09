package org.example.demospring.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.demospring.entity.Product;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailResponse {
    private Long productId;
    private String name;
    private Double price;
    private String description;
    private String imageUrl;
    private String restaurantName;
    private Integer cookingTime;
    private Integer calories;
    private Double rating;
    private Boolean isAiRecommended;
    private List<String> tags;
    private List<RecipeDetail> recipes;
    private Double latitude;
    private Double longitude;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecipeDetail {
        private Long ingredientId;
        private String ingredientName;
        private String unit;
        private Float quantity;
    }
}
