package com.reciept.backend.service.impl;

import com.reciept.backend.entity.RefreshToken;
import com.reciept.backend.entity.User;
import com.reciept.backend.service.IRefreshTokenService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class RefreshTokenService implements IRefreshTokenService {
    @Override
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedAt(new Date());
        refreshToken.setRevoked(false);
        refreshToken.setExpiredAt(new Date(System.currentTimeMillis() * 1000 * 60 * 60 * 2));
        refreshToken.setUser(user);
        return refreshToken;
    }

}
