package com.workshop.dto;

import com.workshop.domain.Service;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ServiceDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal basePrice;
    private Integer estimatedTime;
    private Service.Category category;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
