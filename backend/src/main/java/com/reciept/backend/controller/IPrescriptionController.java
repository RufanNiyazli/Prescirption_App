package com.reciept.backend.controller;

import com.reciept.backend.dto.PrescriptionRequest;
import com.reciept.backend.dto.PrescriptionResponseDto;

public interface IPrescriptionController {
    public PrescriptionResponseDto savePrescription(PrescriptionRequest request);

}
