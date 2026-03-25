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
    public ResponseEntity<UserProfileResponse> getUserProfile(Principal principal) {
        User user = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(UserProfileResponse.fromEntity(user));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateProfile(@RequestBody UpdateProfileRequest request, Principal principal) {
        User updatedUser = userService.updateProfile(principal.getName(), request);
        return ResponseEntity.ok(UserProfileResponse.fromEntity(updatedUser));
    }
}
