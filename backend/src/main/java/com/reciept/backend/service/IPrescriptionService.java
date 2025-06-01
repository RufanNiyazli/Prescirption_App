package com.reciept.backend.service;

import com.reciept.backend.dto.PrescriptionRequest;
import com.reciept.backend.dto.PrescriptionResponseDto;
import com.reciept.backend.entity.Medicine;

public interface IPrescriptionService {
    public PrescriptionResponseDto savePrescription(PrescriptionRequest request);
}
