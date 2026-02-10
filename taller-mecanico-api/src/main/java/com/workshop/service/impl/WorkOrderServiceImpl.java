package com.workshop.service.impl;

import com.workshop.domain.*;
import com.workshop.repository.*;
import com.workshop.service.WorkOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkOrderServiceImpl implements WorkOrderService {
    private final WorkOrderRepository workOrderRepository;
    private final ClientRepository clientRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final WorkOrderTaskRepository workOrderTaskRepository;
    private final PartRepository partRepository;
    private final WorkOrderTaskPartRepository workOrderTaskPartRepository;
    private final PartMovementRepository partMovementRepository;

    @Override
    public List<WorkOrder> findAll() {
        return workOrderRepository.findAll();
    }

    @Override
    public Optional<WorkOrder> findById(Long id) {
        return workOrderRepository.findById(id);
    }

    @Override
    public WorkOrder save(WorkOrder entity) {
        return workOrderRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        if (!workOrderRepository.existsById(id)) {
            throw new com.workshop.exception.ResourceNotFoundException("WorkOrder", "id", id);
        }
        workOrderRepository.deleteById(id);
    }

    @Override
    public WorkOrder createWorkOrder(Long clientId, Long vehicleId, Long userId, String notes) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new com.workshop.exception.ResourceNotFoundException("Client", "id", clientId));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new com.workshop.exception.ResourceNotFoundException("Vehicle", "id", vehicleId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new com.workshop.exception.ResourceNotFoundException("User", "id", userId));

        if (!vehicle.getClient().getId().equals(clientId)) {
            throw new com.workshop.exception.BusinessException("Vehicle does not belong to client");
        }

        WorkOrder workOrder = new WorkOrder();
        workOrder.setWorkOrderNumber(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        workOrder.setClient(client);
        workOrder.setVehicle(vehicle);
        workOrder.setAssignedUser(user);
        workOrder.setNotes(notes);
        workOrder.setStatus(WorkOrder.Status.PENDING);
        workOrder.setPriority(WorkOrder.Priority.MEDIUM);
        workOrder.setTotalEstimatedCost(BigDecimal.ZERO);
        workOrder.setTotalActualCost(BigDecimal.ZERO);

        return workOrderRepository.save(workOrder);
    }

    @Override
    public WorkOrderTask addTask(Long workOrderId, Long serviceId, String notes) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(
                        () -> new com.workshop.exception.ResourceNotFoundException("WorkOrder", "id", workOrderId));
        com.workshop.domain.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new com.workshop.exception.ResourceNotFoundException("Service", "id", serviceId));

        WorkOrderTask task = new WorkOrderTask();
        task.setWorkOrder(workOrder);
        task.setService(service);
        task.setNotes(notes);
        task.setQuantity(1);
        task.setActualPrice(service.getBasePrice());
        task.setStatus(WorkOrderTask.Status.PENDING);

        WorkOrderTask savedTask = workOrderTaskRepository.save(task);

        updateWorkOrderCost(workOrder, savedTask.getActualPrice());

        return savedTask;
    }

    @Override
    public void addPartToTask(Long taskId, Long partId, Integer quantity) {
        WorkOrderTask task = workOrderTaskRepository.findById(taskId)
                .orElseThrow(() -> new com.workshop.exception.ResourceNotFoundException("Task", "id", taskId));
        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new com.workshop.exception.ResourceNotFoundException("Part", "id", partId));

        if (part.getQuantity() < quantity) {
            throw new com.workshop.exception.BusinessException("Not enough stock for part: " + part.getName());
        }

        BigDecimal totalPrice = part.getUnitPrice().multiply(BigDecimal.valueOf(quantity));

        WorkOrderTaskPart taskPart = new WorkOrderTaskPart();
        taskPart.setWorkOrderTask(task);
        taskPart.setPart(part);
        taskPart.setQuantityUsed(quantity);
        taskPart.setUnitPrice(part.getUnitPrice());
        taskPart.setTotalPrice(totalPrice);
        taskPart.setUsedAt(LocalDateTime.now());

        workOrderTaskPartRepository.save(taskPart);

        // Update Stock
        part.setQuantity(part.getQuantity() - quantity);
        partRepository.save(part);

        // Record Movement
        PartMovement movement = new PartMovement();
        movement.setPart(part);
        movement.setQuantity(quantity); // Quantity is absolute, Type defines IN/OUT
        movement.setMovementType(PartMovement.MovementType.OUT);
        movement.setMovementDate(LocalDateTime.now());
        movement.setReason("Used in WorkOrder " + task.getWorkOrder().getWorkOrderNumber());
        partMovementRepository.save(movement);

        // Update WorkOrder Cost
        updateWorkOrderCost(task.getWorkOrder(), totalPrice);
    }

    @Override
    public void updateStatus(Long workOrderId, WorkOrder.Status status) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(
                        () -> new com.workshop.exception.ResourceNotFoundException("WorkOrder", "id", workOrderId));

        // Add business logic validation for transitions if needed
        workOrder.setStatus(status);
        if (status == WorkOrder.Status.COMPLETED) {
            workOrder.setActualCompletionDate(LocalDateTime.now());
        }
        workOrderRepository.save(workOrder);
    }

    private void updateWorkOrderCost(WorkOrder workOrder, BigDecimal amountToAdd) {
        workOrder.setTotalActualCost(workOrder.getTotalActualCost().add(amountToAdd));
        workOrderRepository.save(workOrder);
    }
}