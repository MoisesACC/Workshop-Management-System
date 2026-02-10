package com.workshop.dto;

import com.workshop.domain.Part;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class PartDTO {
    private Long id;
    private String code;
    private String name;
    private String description;
    private String supplier;
    private Part.Category category;
    private BigDecimal unitPrice;
    private Integer quantity;
    private Integer minimumStock;
    private LocalDate expiryDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
