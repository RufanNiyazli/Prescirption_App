package com.reciept.backend.service.impl;

import com.reciept.backend.dto.AuthResponse;
import com.reciept.backend.dto.RegisterRequest;
import com.reciept.backend.entity.User;
import com.reciept.backend.repository.UserRepository;
import com.reciept.backend.security.JwtService;
import com.reciept.backend.service.IAuthService;
import com.reciept.backend.service.IRefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private UserRepository userRepository;
    private IRefreshTokenService refreshTokenService;


    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Bele ad var");
        }

        User user = User.builder().
                username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("Doctor")
                .build();

        User dbUser = userRepository.save(user);


        String accessToken = jwtService.generateToken(dbUser);
        String refreshToken = refreshTokenService.createRefreshToken(user).getToken();


        return new AuthResponse(accessToken, refreshToken);
    }
}
