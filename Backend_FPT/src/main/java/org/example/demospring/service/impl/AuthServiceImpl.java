package org.example.demospring.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.request.AuthRequest;
import org.example.demospring.dto.response.AuthResponse;
import org.example.demospring.entity.User;
import org.example.demospring.repository.UserRepository;
import org.example.demospring.security.JwtUtil;
import org.example.demospring.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        // In a real application, consider using AuthenticationManager
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUsername());
                return AuthResponse.builder()
                        .token(token)
                        .message("Authentication successful")
                        .build();
            }
        }

        throw new RuntimeException("Invalid username or password");
    }

    @Override
    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername());

        return AuthResponse.builder()
                .token(token)
                .message("User registered successfully")
                .build();
    }
}
