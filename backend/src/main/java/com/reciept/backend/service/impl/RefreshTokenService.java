package com.reciept.backend.service.impl;

import com.reciept.backend.entity.RefreshToken;
import com.reciept.backend.entity.User;
import com.reciept.backend.repository.RefreshTokenrepository;
import com.reciept.backend.service.IRefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class RefreshTokenService implements IRefreshTokenService {
    @Autowired
    private RefreshTokenrepository refreshTokenrepository;

    @Override
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedAt(new Date());
        refreshToken.setRevoked(false);
        refreshToken.setExpiredAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2));
        refreshToken.setUser(user);
        return refreshToken;
    }

    @Override
    public RefreshToken validateRefreshToken(String tokenStr) {
        RefreshToken token = refreshTokenrepository.findByToken(tokenStr)
                .orElseThrow(() -> new RuntimeException("Refresh token tapılmadı!"));

        // Token vaxtı keçibsə
        if (token.getExpiredAt().before(new Date())) {
            token.setRevoked(true); // Artıq keçibsə, revoked true et
            refreshTokenrepository.save(token);
            throw new RuntimeException("Refresh token vaxtı keçib. Yenidən giriş edin.");
        }

        // Token bloklanıbsa (manual logout və s. kimi)
        if (token.isRevoked()) {
            throw new RuntimeException("Refresh token artıq istifadə olunub və bloklanıb.");
        }

        return token;
    }


}
