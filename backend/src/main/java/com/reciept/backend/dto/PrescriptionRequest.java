package com.reciept.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionRequest {
    private Long userId;


    private List<Long> medicineIds;

    private String notes;

    private Date createdAt;
}
