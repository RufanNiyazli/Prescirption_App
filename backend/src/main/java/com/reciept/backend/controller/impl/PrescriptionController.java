package com.reciept.backend.controller.impl;

import com.reciept.backend.controller.IPrescriptionController;
import com.reciept.backend.dto.PrescriptionRequest;
import com.reciept.backend.dto.PrescriptionResponseDto;
import com.reciept.backend.service.IPrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrescriptionController implements IPrescriptionController {

    @Autowired
    IPrescriptionService prescriptionService;

    @Override
    @PostMapping("/save/medicine")
    public PrescriptionResponseDto savePrescription(@RequestBody PrescriptionRequest request) {
        return prescriptionService.savePrescription(request);
    }
}
