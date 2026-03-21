package org.example.demospring.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.demospring.entity.Restaurant;
import org.example.demospring.repository.RestaurantRepository;
import org.example.demospring.service.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Override
    public List<Restaurant> searchRestaurants(String name) {
        if (name == null || name.trim().isEmpty()) {
            return restaurantRepository.findAll();
        }
        return restaurantRepository.findAllByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }
}
