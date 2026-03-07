package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<String> getUserProfile(Principal principal) {
        // Sử dụng UserService để lấy thông tin
        String profileInfo = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(profileInfo);
    }
}
