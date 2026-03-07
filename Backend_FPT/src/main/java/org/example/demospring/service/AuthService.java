package org.example.demospring.service;

import org.example.demospring.dto.request.AuthRequest;
import org.example.demospring.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse authenticate(AuthRequest request);

    AuthResponse register(AuthRequest request);
}
