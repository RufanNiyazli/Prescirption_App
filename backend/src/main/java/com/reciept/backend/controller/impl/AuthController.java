package com.reciept.backend.controller.impl;

import com.reciept.backend.controller.IAuthController;
import com.reciept.backend.dto.AuthRequest;
import com.reciept.backend.dto.AuthResponse;
import com.reciept.backend.dto.RegisterRequest;
import com.reciept.backend.service.IAuthService;
import com.reciept.backend.service.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController implements IAuthController {
    @Autowired
    private IAuthService authService;


    @Override
    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @Override
    @PostMapping("/authenticate")
    public AuthResponse authenticate(@RequestBody AuthRequest authRequest) {
        return authService.authenticate(authRequest);
    }

    @Override
    public AuthResponse refreshAccessToken(String tokenStr) {
        return authService.refreshAccessToken(tokenStr);
    }

}
