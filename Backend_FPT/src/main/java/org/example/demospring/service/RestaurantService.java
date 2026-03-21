package org.example.demospring.service;

import org.example.demospring.entity.Restaurant;
import java.util.List;

public interface RestaurantService {
    List<Restaurant> searchRestaurants(String name);
    List<Restaurant> getAllRestaurants();
}
