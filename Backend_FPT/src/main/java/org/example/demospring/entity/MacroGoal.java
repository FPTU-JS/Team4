package org.example.demospring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "macro_goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MacroGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    private int targetCals;
    private int leftCals;

    private int currentProtein;
    private int targetProtein;

    private int currentCarbs;
    private int targetCarbs;

    private int currentFats;
    private int targetFats;
}
