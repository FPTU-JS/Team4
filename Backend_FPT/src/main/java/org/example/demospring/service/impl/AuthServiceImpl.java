package org.example.demospring.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.request.AuthRequest;
import org.example.demospring.dto.request.RegisterRequest;
import org.example.demospring.dto.request.VerifyOtpRequest;
import org.example.demospring.dto.response.AuthResponse;
import org.example.demospring.entity.User;
import org.example.demospring.entity.VerificationToken;
import org.example.demospring.repository.UserRepository;
import org.example.demospring.repository.VerificationTokenRepository;
import org.example.demospring.security.JwtUtil;
import org.example.demospring.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use.");
        }
        if (request.getUsername() != null && userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already in use.");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role("CUSTOMER")
                .status("Pending") // Pending verification
                .build();
        userRepository.save(user);

        // Generate OTP
        String tokenStr = String.format("%06d", new Random().nextInt(999999));
        VerificationToken token = VerificationToken.builder()
                .user(user)
                .tokenString(tokenStr)
                .type("OTP")
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();
        tokenRepository.save(token);

        // TODO: integrate Email sending logic here. For now, print to console.
        System.out.println("OTP CODE FOR " + request.getEmail() + ": " + tokenStr);

        return AuthResponse.builder()
                .message("Registration successful. OTP has been sent to your email.")
                .build();
    }

    @Override
    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"Pending".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("User is already verified or active.");
        }

        VerificationToken token = tokenRepository.findByTokenString(request.getOtp())
                .orElseThrow(() -> new RuntimeException("Invalid OTP token."));

        if (!token.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("OTP token does not match the user.");
        }

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP token has expired.");
        }

        // Activate User
        user.setStatus("Active");
        userRepository.save(user);

        // Optional: delete or mark the token as used, we'll just delete it for now
        tokenRepository.delete(token);

        // Generate JWT
        String jwtToken = jwtUtil.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .message("OTP Verified Successfully. User activated.")
                .build();
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        // Attempt to find user by email or username
        User user = userRepository.findByEmail(request.getEmailOrUsername())
                .orElseGet(() -> userRepository.findByUsername(request.getEmailOrUsername())
                        .orElseThrow(() -> new RuntimeException("User not found")));

        // Ensure user is active
        if (!"Active".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("User is not active. Current status: " + user.getStatus());
        }

        // We use UsernamePasswordAuthenticationToken. We will pass either email or
        // username,
        // whatever Spring Security uses as principle context.
        // It relies on UserDetailsService in config.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword()));

        String jwtToken = jwtUtil.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .message("Login successful.")
                .build();
    }
}
