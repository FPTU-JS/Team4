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
                Predicate timeLess = criteriaBuilder.lessThanOrEqualTo(root.get("cookingTime"), maxCookingTime);
                Predicate timeNull = criteriaBuilder.isNull(root.get("cookingTime"));
                predicates.add(criteriaBuilder.or(timeLess, timeNull));
            }
            if (minCalories != null) {
                Predicate calGreater = criteriaBuilder.greaterThanOrEqualTo(root.get("calories"), minCalories);
                Predicate calNull = criteriaBuilder.isNull(root.get("calories"));
                predicates.add(criteriaBuilder.or(calGreater, calNull));
            }
            if (maxCalories != null) {
                Predicate calLess = criteriaBuilder.lessThanOrEqualTo(root.get("calories"), maxCalories);
                Predicate calNull = criteriaBuilder.isNull(root.get("calories"));
                predicates.add(criteriaBuilder.or(calLess, calNull));
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
