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
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.BadCredentialsException;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.security.authentication.LockedException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender javaMailSender;

    // In-memory Brute Force Protection Cache
    private final ConcurrentHashMap<String, Integer> failedAttempts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, LocalDateTime> lockoutTime = new ConcurrentHashMap<>();
    private static final int MAX_ATTEMPTS = 5;
    private static final int LOCKOUT_MINUTES = 15;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use.");
        }
        if (request.getUsername() != null) {
            if (!request.getUsername().matches("^[a-zA-Z0-9_]+$")) {
                throw new RuntimeException("Username must not contain spaces or special characters.");
            }
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("Username is already in use..");
            }
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role("CUSTOMER")
                .status("Active") // Pending verification
                .build();
        userRepository.save(user);

        // Generate OTP
//        String tokenStr = String.format("%06d", new Random().nextInt(999999));
//        VerificationToken token = VerificationToken.builder()
//                .user(user)
//                .tokenString(tokenStr)
//                .type("OTP")
//                .expiresAt(LocalDateTime.now().plusMinutes(15))
//                .build();
//        tokenRepository.save(token);
//
//        // Gửi thư điện tử thật sự
//        try {
//            SimpleMailMessage mailMessage = new SimpleMailMessage();
//            mailMessage.setTo(request.getEmail());
//            mailMessage.setSubject("Your Verification Code - CO-CHE");
//            mailMessage.setText("Chào " + (request.getFullName() != null ? request.getFullName() : request.getUsername()) + ",\n\n" +
//                                "Mã OTP xác thực tài khoản của bạn là: " + tokenStr + "\n" +
//                                "Mã này sẽ hết hạn trong vòng 15 phút.\n\n" +
//                                "Trân trọng,\nĐội ngũ CO-CHE");
//            javaMailSender.send(mailMessage);
//            System.out.println("OTP sent to " + request.getEmail() + " successfully.");
//        } catch (Exception e) {
//            System.err.println("Failed to send OTP email to " + request.getEmail() + ": " + e.getMessage());
//        }

        return AuthResponse.builder()
                .message("Registration successful. Please login with your credentials.")
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
        String key = request.getEmailOrUsername();

        // 1. Check if user is currently locked out
        if (lockoutTime.containsKey(key)) {
            if (LocalDateTime.now().isBefore(lockoutTime.get(key))) {
                throw new LockedException("Your account has been temporarily locked due to too many incorrect entries. Please try again in 15 minutes.");
            } else {
                // Lockout period has expired, reset counters
                lockoutTime.remove(key);
                failedAttempts.remove(key);
            }
        }

        // 2. Attempt to find user
        User user = userRepository.findByEmail(key)
                .orElseGet(() -> userRepository.findByUsername(key)
                        .orElseThrow(() -> new BadCredentialsException("Invalid username or password.")));

        // 3. Ensure user is active
        if (!"Active".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("The account has not been activated or has been banned.");
        }

        // 4. Authenticate credentials
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword()));
            
            // Login successful: reset attempts
            failedAttempts.remove(key);
        } catch (BadCredentialsException ex) {
            // Login failed: increment attempts
            int attempts = failedAttempts.getOrDefault(key, 0) + 1;
            failedAttempts.put(key, attempts);
            
            if (attempts >= MAX_ATTEMPTS) {
                lockoutTime.put(key, LocalDateTime.now().plusMinutes(LOCKOUT_MINUTES));
                throw new LockedException("Your account has been temporarily locked due to 5 consecutive incorrect login attempts. Please try again in 15 minutes.");
            }
            throw new BadCredentialsException("Wrong password. You have " + (MAX_ATTEMPTS - attempts) + " more attempts.");
        }

        String jwtToken = jwtUtil.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .message("Login successful.")
                .build();
    }
}
