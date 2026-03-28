package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.entity.AppNotification;
import org.example.demospring.repository.NotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;

    @GetMapping
    public ResponseEntity<List<AppNotification>> getUserNotifications() {
        Long userId = org.example.demospring.security.SecurityUtils.getCurrentUserId();
        if (userId == null) return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(notificationRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable("id") Long id) {
        AppNotification notif = notificationRepository.findById(id).orElseThrow();
        notif.setRead(true);
        notificationRepository.save(notif);
        return ResponseEntity.ok().build();
    }
}
