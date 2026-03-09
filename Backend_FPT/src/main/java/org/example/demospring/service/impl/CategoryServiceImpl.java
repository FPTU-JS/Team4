package org.example.demospring.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.response.CategoryResponse;
import org.example.demospring.entity.Category;
import org.example.demospring.repository.CategoryRepository;
import org.example.demospring.service.CategoryService;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @PostConstruct
    public void initCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> initCats = Arrays.asList(
                    Category.builder().name("Breakfast").description("Start your day right").build(),
                    Category.builder().name("Vegan & Plant-based").description("Healthy greens").build(),
                    Category.builder().name("Seafood Specials").description("Ocean fresh").build(),
                    Category.builder().name("Quick & Easy (15m)").description("In a hurry").build(),
                    Category.builder().name("Desserts").description("Sweet treats").build(),
                    Category.builder().name("Keto Friendly").description("Low carb diet").build());
            categoryRepository.saveAll(initCats);
        }
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(cat -> CategoryResponse.builder()
                        .categoryId(cat.getId())
                        .name(cat.getName())
                        .description(cat.getDescription())
                        .build())
                .collect(Collectors.toList());
    }
}
