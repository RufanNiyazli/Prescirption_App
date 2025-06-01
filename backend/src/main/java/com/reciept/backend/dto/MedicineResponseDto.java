package com.reciept.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineResponseDto {
    private Long id;
    private String name;
    private String category;
    private String dosageForm;

}
