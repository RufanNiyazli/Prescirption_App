package com.reciept.backend.repository;

import com.reciept.backend.entity.Medicine;
import com.reciept.backend.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    Optional<Prescription> findByHashId(String hashId);
}
