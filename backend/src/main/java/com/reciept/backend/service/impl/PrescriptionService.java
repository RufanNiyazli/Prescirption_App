package com.reciept.backend.service.impl;

import com.reciept.backend.dto.MedicineResponseDto;
import com.reciept.backend.dto.PrescriptionRequest;
import com.reciept.backend.dto.PrescriptionResponseDto;
import com.reciept.backend.entity.Medicine;
import com.reciept.backend.entity.Prescription;
import com.reciept.backend.entity.User;
import com.reciept.backend.repository.MedicineRepository;
import com.reciept.backend.repository.PrescriptionRepository;
import com.reciept.backend.repository.UserRepository;
import com.reciept.backend.service.IPrescriptionService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionService implements IPrescriptionService {
    @Autowired
    private PrescriptionRepository prescriptionRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public PrescriptionResponseDto savePrescription(PrescriptionRequest request) {
        // 1. User tap
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));

        // 2. Dərmanları tap
        List<Medicine> medicines = request.getMedicineIds().stream()
                .map(id -> medicineRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id)))
                .collect(Collectors.toList());

        // 3. Yeni Prescription yarat
        Prescription newPrescription = new Prescription();
        newPrescription.setUser(user);
        newPrescription.setNotes(request.getNotes());
        newPrescription.setMedicines(medicines);
        newPrescription.setCreatedAt(
                request.getCreatedAt() != null ? request.getCreatedAt() : new Date()
        );

        // 4. DB-yə save et
        Prescription dbPrescription = prescriptionRepository.save(newPrescription);

        // 5. Response üçün DTO hazırla
        PrescriptionResponseDto responseDto = new PrescriptionResponseDto();
        responseDto.setId(dbPrescription.getId());
        responseDto.setUserId(dbPrescription.getUser().getId());
        responseDto.setNotes(dbPrescription.getNotes());
        responseDto.setCreatedAt(dbPrescription.getCreatedAt());

        // 6. Medicine entity-ləri DTO-ya map et
        responseDto.setMedicines(
                dbPrescription.getMedicines().stream().map(medicine -> {
                    // Burada MedicineDto class-ına uyğun dəyiş
                    return new MedicineResponseDto(
                            medicine.getId(),
                            medicine.getName(),
                            medicine.getCategory(),
                            medicine.getDosageForm()
                    );
                }).collect(Collectors.toList())
        );

        return responseDto;
    }

}
