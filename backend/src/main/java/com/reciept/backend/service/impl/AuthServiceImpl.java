package com.reciept.backend.service.impl;

import com.reciept.backend.dto.AuthRequest;
import com.reciept.backend.dto.AuthResponse;
import com.reciept.backend.dto.RegisterRequest;
import com.reciept.backend.entity.RefreshToken;
import com.reciept.backend.entity.User;
import com.reciept.backend.repository.RefreshTokenrepository;
import com.reciept.backend.repository.UserRepository;
import com.reciept.backend.security.JwtService;
import com.reciept.backend.service.IAuthService;
import com.reciept.backend.service.IRefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IRefreshTokenService refreshTokenService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RefreshTokenrepository refreshTokenrepository;


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


    @Override
    public AuthResponse authenticate(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
        Optional<User> optionalUser = userRepository.findByEmail(authRequest.getEmail());
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("optianl bosdu");
        }
        String accessToken = jwtService.generateToken(optionalUser.get());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(optionalUser.get());
        refreshTokenrepository.save(refreshToken);

        return new AuthResponse(accessToken, refreshToken.getToken());
    }

    @Override
    public AuthResponse refreshAccessToken(String tokenStr) {

        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(tokenStr);
        User user = refreshToken.getUser();
        String newAccessToken = jwtService.generateToken(user);


        return new AuthResponse(newAccessToken, refreshToken.getToken());
    }


}
