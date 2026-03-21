package org.example.demospring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "status", length = 20)
    private String status = "Available";

    @Column(name = "cooking_time")
    private Integer cookingTime;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "is_ai_recommended")
    private Boolean isAiRecommended = false;

    @Column(name = "tags")
    private String tags;

    @Column(name = "dietary_preferences")
    private String dietaryPreferences;
}
