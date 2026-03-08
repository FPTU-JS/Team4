package org.example.demospring.security;

import lombok.RequiredArgsConstructor;
import org.example.demospring.entity.AuthProvider;
import org.example.demospring.entity.User;
import org.example.demospring.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (Exception ex) {
            throw new OAuth2AuthenticationException(ex.getMessage());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        AuthProvider provider = AuthProvider.valueOf(registrationId.toLowerCase());

        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            if (provider.equals(AuthProvider.facebook)) {
                String id = oAuth2User.getAttribute("id");
                email = id + "@facebook.com";
            } else {
                throw new IllegalArgumentException("Email not found from OAuth2 provider");
            }
        }

        String name = oAuth2User.getAttribute("name");
        String pUrl = null;
        if (provider.equals(AuthProvider.google)) {
            pUrl = oAuth2User.getAttribute("picture");
        } else if (provider.equals(AuthProvider.facebook)) {
            // Depending on fields requested, could be under 'picture.data.url'
            pUrl = null;
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Optional: Update user's name or avatar if needed
            if (!provider.equals(user.getProvider())) {
                user.setProvider(provider);
                user = userRepository.save(user);
            }
        } else {
            // Register new user
            user = User.builder()
                    .email(email)
                    .fullName(name != null ? name : "Unknown")
                    // Generating a dummy username based on email prefix
                    .username(email.split("@")[0] + "_" + provider.name())
                    // Dummy password for OAuth users (they shouldn't login via local provider
                    // anyway)
                    .password("")
                    .avatarUrl(pUrl)
                    .role("USER")
                    .status("Active")
                    .provider(provider)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            user = userRepository.save(user);
        }

        return CustomOAuth2User.create(user, oAuth2User.getAttributes());
    }
}
