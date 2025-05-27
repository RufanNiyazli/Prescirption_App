package com.reciept.backend.service;

import com.reciept.backend.entity.RefreshToken;
import com.reciept.backend.entity.User;

public interface IRefreshTokenService {

    public RefreshToken createRefreshToken(User user);
}
