package com.reciept.backend.repository;

import com.reciept.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Email ilə istifadəçi tapma
    Optional<User> findByEmail(String email);

    // Email mövcudluğunu yoxlama
    boolean existsByEmail(String email);

    // Əgər hələ də username lazımsa
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
