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
    public User getUserProfile(String username) {
        return userRepository.findByEmail(username)
                .orElseGet(() -> userRepository.findByUsername(username)
                        .orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Override
    public User updateProfile(String currentUsername, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(currentUsername)
                .orElseGet(() -> userRepository.findByUsername(currentUsername)
                        .orElseThrow(() -> new RuntimeException("User not found")));

        // Check if new username is different and already exists
        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
            if (!request.getUsername().matches("^[a-zA-Z0-9_]+$")) {
                throw new RuntimeException("Tên đăng nhập không được chứa khoảng trắng hoặc kí tự đặc biệt.");
            }
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("Tên đăng nhập đã tồn tại.");
            }
            user.setUsername(request.getUsername());
        }

        if (request.getFullName() != null && !request.getFullName().equals(user.getFullName())) {
            user.setFullName(request.getFullName());
        }
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());

        return userRepository.save(user);
    }
}
