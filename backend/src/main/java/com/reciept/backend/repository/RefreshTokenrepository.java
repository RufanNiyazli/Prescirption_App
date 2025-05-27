package com.reciept.backend.repository;

import com.reciept.backend.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenrepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

}
