package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.entity.DailyMeal;
import org.example.demospring.entity.MacroGoal;
import org.example.demospring.repository.DailyMealRepository;
import org.example.demospring.repository.MacroGoalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor
public class HealthyPlanController {

    private final MacroGoalRepository macroGoalRepository;
    private final DailyMealRepository dailyMealRepository;

    @GetMapping("/macros")
    public ResponseEntity<MacroGoal> getMacros(@RequestParam("userId") Long userId) {
        Optional<MacroGoal> goal = macroGoalRepository.findByUserId(userId);
        if (goal.isPresent()) {
            return ResponseEntity.ok(goal.get());
        } else {
            // Seed default macro goal
            MacroGoal newGoal = MacroGoal.builder()
                    .userId(userId)
                    .targetCals(2400)
                    .leftCals(1610)
                    .currentProtein(108).targetProtein(180)
                    .currentCarbs(117).targetCarbs(250)
                    .currentFats(64).targetFats(80)
                    .build();
            return ResponseEntity.ok(macroGoalRepository.save(newGoal));
        }
    }

    @GetMapping("/meals")
    public ResponseEntity<List<DailyMeal>> getMeals(
            @RequestParam("userId") Long userId,
            @RequestParam("dayOfWeek") String dayOfWeek) {
        
        List<DailyMeal> meals = dailyMealRepository.findByUserIdAndDayOfWeek(userId, dayOfWeek);
        if (meals.isEmpty()) {
            // Seed a default mock meal for this day to show some data
            DailyMeal defaultBreakfast = DailyMeal.builder()
                    .userId(userId)
                    .dayOfWeek(dayOfWeek)
                    .mealType("Breakfast")
                    .title("Breakfast " + dayOfWeek)
                    .description("Sourdough, microgreens, chili flakes")
                    .imageUrl("https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80")
                    .cals(420).protein(18).carbs(32).fats(24)
                    .build();
            dailyMealRepository.save(defaultBreakfast);

            DailyMeal defaultLunch = DailyMeal.builder()
                    .userId(userId)
                    .dayOfWeek(dayOfWeek)
                    .mealType("Lunch")
                    .title("Lunch " + dayOfWeek)
                    .description("Quinoa, kale, roasted sweet potato")
                    .imageUrl("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80")
                    .cals(580).protein(42).carbs(45).fats(18)
                    .build();
            dailyMealRepository.save(defaultLunch);

            DailyMeal defaultDinner = DailyMeal.builder()
                    .userId(userId)
                    .dayOfWeek(dayOfWeek)
                    .mealType("Dinner")
                    .title("Dinner " + dayOfWeek)
                    .description("Lean beef chunk, steamed asparagus")
                    .imageUrl("https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80")
                    .cals(600).protein(48).carbs(40).fats(22)
                    .build();
            dailyMealRepository.save(defaultDinner);
            
            return ResponseEntity.ok(List.of(defaultBreakfast, defaultLunch, defaultDinner));
        }
        
        return ResponseEntity.ok(meals);
    }
}
