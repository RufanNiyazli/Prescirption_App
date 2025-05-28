package com.reciept.backend.controller;

import com.reciept.backend.dto.AuthRequest;
import com.reciept.backend.dto.AuthResponse;
import com.reciept.backend.dto.RegisterRequest;

public interface IAuthController {
    public AuthResponse register(RegisterRequest registerRequest);

    public AuthResponse authenticate(AuthRequest authRequest);

    public AuthResponse refreshAccessToken(String tokenStr);
}
