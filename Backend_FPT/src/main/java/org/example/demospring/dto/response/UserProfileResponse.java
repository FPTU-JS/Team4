package org.example.demospring.dto.response;

import lombok.Builder;
import lombok.Data;
import org.example.demospring.entity.User;

@Data
@Builder
public class UserProfileResponse {
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String bio;
    private String avatarUrl;
    private String role;
    
    public static UserProfileResponse fromEntity(User user) {
        return UserProfileResponse.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .username(user.getUsername())
            .email(user.getEmail())
            .bio(user.getBio())
            .avatarUrl(user.getAvatarUrl())
            .role(user.getRole())
            .build();
    }
}
