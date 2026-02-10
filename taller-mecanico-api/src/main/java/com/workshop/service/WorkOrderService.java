package com.workshop.service;

import com.workshop.domain.WorkOrder;
import com.workshop.domain.WorkOrderTask;
import com.workshop.common.BaseService;

public interface WorkOrderService extends BaseService<WorkOrder, Long> {
    WorkOrder createWorkOrder(Long clientId, Long vehicleId, Long userId, String notes);

    WorkOrderTask addTask(Long workOrderId, Long serviceId, String notes);

    void addPartToTask(Long taskId, Long partId, Integer quantity);

    void updateStatus(Long workOrderId, WorkOrder.Status status);
}