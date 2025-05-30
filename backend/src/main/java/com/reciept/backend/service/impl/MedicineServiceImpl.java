package com.reciept.backend.service.impl;

import com.reciept.backend.entity.Medicine;
import com.reciept.backend.repository.MedicineRepository;
import com.reciept.backend.service.IMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements IMedicineService {

    @Autowired
    private MedicineRepository medicineRepository;


    @Override

    public List<Medicine> searchMedicine(String keyword) {
        return medicineRepository.searchByNameOrCategory(keyword);
    }
}
