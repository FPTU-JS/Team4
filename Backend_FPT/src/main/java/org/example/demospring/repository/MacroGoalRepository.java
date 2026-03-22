package org.example.demospring.repository;

import org.example.demospring.entity.MacroGoal;
import org.example.demospring.entity.DailyMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MacroGoalRepository extends JpaRepository<MacroGoal, Long> {
    Optional<MacroGoal> findByUserId(Long userId);
}
