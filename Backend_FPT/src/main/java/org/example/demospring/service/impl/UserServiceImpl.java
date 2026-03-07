package org.example.demospring.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.demospring.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Override
    public String getUserProfile(String username) {
        // Có thể tích hợp với các API bên thứ ba (như Gemini, Mapbox) sau này.
        return "Thông tin cá nhân của người dùng: " + username;
    }
}
