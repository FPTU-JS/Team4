package org.example.demospring.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.demospring.service.UserService;
import org.springframework.stereotype.Service;

import org.example.demospring.dto.request.UpdateProfileRequest;
import org.example.demospring.entity.User;
import org.example.demospring.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public String getUserProfile(String username) {
        // Có thể tích hợp với các API bên thứ ba (như Gemini, Mapbox) sau này.
        return "Thông tin cá nhân của người dùng: " + username;
    }

    @Override
    public User updateProfile(String currentUsername, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(currentUsername)
                .orElseGet(() -> userRepository.findByUsername(currentUsername)
                        .orElseThrow(() -> new RuntimeException("User not found")));

        // Check if new username is different and already exists
        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("Username is already taken");
            }
            user.setUsername(request.getUsername());
        }

        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());

        return userRepository.save(user);
    }
}
