package com.workshop.dto;

import com.workshop.domain.Service;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateServiceRequest {
    private String name;
    private String description;
    private BigDecimal basePrice;
    private Integer estimatedTime;
    private Service.Category category;
    private Boolean isActive;
}
