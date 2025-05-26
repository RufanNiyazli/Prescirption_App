package com.reciept.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "prescriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String medicines; // JSON string for medicines

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false)
    private Date createdAt;

    @OneToOne(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)
    private OTP otp;
}
