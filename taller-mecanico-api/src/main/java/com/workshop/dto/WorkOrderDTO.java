package com.workshop.dto;

import com.workshop.domain.WorkOrder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkOrderDTO {
    private Long id;
    private String workOrderNumber;
    private WorkOrder.Status status;
    private WorkOrder.Priority priority;
    private BigDecimal totalEstimatedCost;
    private BigDecimal totalActualCost;
    private LocalDateTime estimatedCompletionDate;
    private LocalDateTime actualCompletionDate;
    private String notes;
    private Long clientId;
    private String clientName;
    private Long vehicleId;
    private String vehiclePlate;
    private Long assignedUserId;
    private String assignedUserName;
    private List<WorkOrderTaskDTO> tasks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
