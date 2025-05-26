package com.reciept.backend.service;

import com.reciept.backend.dto.AuthResponse;
import com.reciept.backend.dto.RegisterRequest;

public interface IAuthService {
    public AuthResponse register(RegisterRequest request);
}
