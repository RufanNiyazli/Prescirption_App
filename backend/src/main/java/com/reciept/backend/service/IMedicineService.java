package com.reciept.backend.service;

import com.reciept.backend.entity.Medicine;

import java.util.List;

public interface IMedicineService {
    public List<Medicine> searchMedicine(String keyword);
}
