package com.workshop.dto;

import lombok.Data;

@Data
public class CreateWorkOrderRequest {
    private Long clientId;
    private Long vehicleId;
    private Long userId;
    private String notes;
}
