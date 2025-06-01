package com.reciept.backend.repository;

import com.reciept.backend.entity.Medicine;
import com.reciept.backend.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
}
