package com.workshop.dto;

import com.workshop.domain.Vehicle;
import lombok.Data;

@Data
public class CreateVehicleRequest {
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
}
