package org.example.demospring.service;

import org.example.demospring.dto.request.AuthRequest;
import org.example.demospring.dto.request.RegisterRequest;
import org.example.demospring.dto.request.VerifyOtpRequest;
import org.example.demospring.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse verifyOtp(VerifyOtpRequest request);

    AuthResponse authenticate(AuthRequest request);
}
