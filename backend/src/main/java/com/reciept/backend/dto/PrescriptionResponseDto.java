package com.reciept.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionResponseDto {

    private Long id;
    private Long userId;
    private List<MedicineResponseDto> medicines;
    private String notes;
    private Date createdAt;
    private String hashId;
}
