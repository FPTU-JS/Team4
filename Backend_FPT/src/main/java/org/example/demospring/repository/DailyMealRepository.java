package org.example.demospring.repository;

import org.example.demospring.entity.DailyMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyMealRepository extends JpaRepository<DailyMeal, Long> {
    List<DailyMeal> findByUserIdAndDayOfWeek(Long userId, String dayOfWeek);
    List<DailyMeal> findByUserId(Long userId);
}
