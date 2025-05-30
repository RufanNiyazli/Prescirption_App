package com.reciept.backend.controller;

import com.reciept.backend.entity.Medicine;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public interface IMedicineController {
    public List<Medicine> searchMedicine(String keyword);
}
