package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.request.UpdateProfileRequest;
import org.example.demospring.dto.response.UserProfileResponse;
import org.example.demospring.entity.User;
import org.example.demospring.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<String> getUserProfile(Principal principal) {
        String profileInfo = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(profileInfo);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest request, Principal principal) {
        try {
            User updatedUser = userService.updateProfile(principal.getName(), request);
            return ResponseEntity.ok(UserProfileResponse.fromEntity(updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
