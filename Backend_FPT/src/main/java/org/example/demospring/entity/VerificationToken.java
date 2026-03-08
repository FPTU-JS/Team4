package org.example.demospring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "verificationtokens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "token_string", nullable = false)
    private String tokenString;

    @Column(name = "type", nullable = false, length = 50)
    private String type; // e.g., "OTP", "PASSWORD_RESET"

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;
}
