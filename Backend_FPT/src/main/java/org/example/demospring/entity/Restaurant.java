package org.example.demospring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "address", nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "logo_url", columnDefinition = "TEXT")
    private String logoUrl;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "status", length = 20)
    private String status = "Open";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
