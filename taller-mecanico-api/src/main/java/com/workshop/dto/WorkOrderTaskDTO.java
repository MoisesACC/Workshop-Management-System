package com.workshop.dto;

import com.workshop.domain.WorkOrderTask;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class WorkOrderTaskDTO {
    private Long id;
    private Long serviceId;
    private String serviceName;
    private BigDecimal actualPrice;
    private Integer quantity;
    private String notes;
    private WorkOrderTask.Status status;
    private List<WorkOrderTaskPartDTO> parts;
}
