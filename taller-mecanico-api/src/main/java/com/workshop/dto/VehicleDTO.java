package com.workshop.dto;

import com.workshop.domain.Vehicle;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class VehicleDTO {
    private Long id;
    private String licensePlate;
    private String vin;
    private String brand;
    private String model;
    private Integer year;
    private String color;
    private Vehicle.EngineType engineType;
    private Integer mileage;
    private String notes;
    private Long clientId;
    private String clientName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
