package org.example.demospring.service;

import org.example.demospring.dto.request.UpdateProfileRequest;
import org.example.demospring.entity.User;

public interface UserService {
    // Thêm các phương thức business logic của người dùng tại đây
    User getUserProfile(String username);
    User updateProfile(String currentUsername, UpdateProfileRequest request);
}
