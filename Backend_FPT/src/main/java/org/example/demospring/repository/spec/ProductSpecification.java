package org.example.demospring.repository.spec;

import org.example.demospring.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filterBy(String keyword, Integer maxCookingTime, Integer minCalories,
            Integer maxCalories, List<String> tags) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
                        "%" + keyword.toLowerCase() + "%"));
            }
            if (maxCookingTime != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("cookingTime"), maxCookingTime));
            }
            if (minCalories != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("calories"), minCalories));
            }
            if (maxCalories != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("calories"), maxCalories));
            }
            if (tags != null && !tags.isEmpty()) {
                for (String tag : tags) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("dietaryPreferences")),
                            "%" + tag.toLowerCase() + "%"));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
