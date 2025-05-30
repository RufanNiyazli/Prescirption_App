package com.reciept.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        try {
            return Jwts.builder()
                    .subject(userDetails.getUsername()) // Bu artıq email olacaq
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2))
                    .signWith(getKey(), Jwts.SIG.HS256)
                    .compact();
        } catch (Exception e) {
            throw new RuntimeException("JWT yaratmaq mümkün olmadı", e);
        }
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Token-dan email əldə etmək
    public String getEmailByToken(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = getEmailByToken(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}