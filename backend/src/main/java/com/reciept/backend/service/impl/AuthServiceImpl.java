package com.reciept.backend.service.impl;

import com.reciept.backend.dto.AuthResponse;
import com.reciept.backend.dto.RegisterRequest;
import com.reciept.backend.repository.UserRepository;
import com.reciept.backend.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
    private UserRepository userRepository;


    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Bele ad var");
        }
        return null;
    }
}
