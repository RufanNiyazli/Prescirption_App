package com.reciept.backend.controller.impl;

import com.reciept.backend.controller.IMedicineController;
import com.reciept.backend.entity.Medicine;
import com.reciept.backend.service.IMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MedicineController implements IMedicineController {

    @Autowired
    private IMedicineService medicineService;


    @GetMapping("/medicine")
    @Override
    public List<Medicine> searchMedicine(@RequestParam String keyword) {
        return medicineService.searchMedicine(keyword);
    }
}
