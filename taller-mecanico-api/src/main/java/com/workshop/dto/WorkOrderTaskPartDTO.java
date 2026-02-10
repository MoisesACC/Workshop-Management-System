package com.workshop.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class WorkOrderTaskPartDTO {
    private Long id;
    private Long partId;
    private String partName;
    private Integer quantityUsed;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
}
