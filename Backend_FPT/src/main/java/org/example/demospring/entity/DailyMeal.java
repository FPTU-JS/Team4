package org.example.demospring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "daily_meals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "day_of_week") // e.g., "Monday", "Tuesday"
    private String dayOfWeek;

    @Column(name = "meal_type") // e.g., "Breakfast", "Lunch", "Dinner"
    private String mealType;

    private String title;
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    private int cals;
    private int protein;
    private int carbs;
    private int fats;
}
