package com.reciept.backend.service;

import com.reciept.backend.dto.AuthRequest;
import com.reciept.backend.dto.AuthResponse;
import com.reciept.backend.dto.RegisterRequest;

public interface IAuthService {
    public AuthResponse register(RegisterRequest request);

    public AuthResponse authenticate(AuthRequest authRequest);
    public AuthResponse refreshAccessToken(String tokenStr);
}
