package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.entity.Restaurant;
import org.example.demospring.service.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend to access
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam(required = false) String name) {
        List<Restaurant> restaurants = restaurantService.searchRestaurants(name);
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }
}
