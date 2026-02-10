package com.workshop.mapper;

import com.workshop.domain.*;
import com.workshop.dto.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class WorkshopMapper {

    public ClientDTO toClientDTO(Client client) {
        if (client == null)
            return null;
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setFirstName(client.getFirstName());
        dto.setLastName(client.getLastName());
        dto.setEmail(client.getEmail());
        dto.setPhone(client.getPhone());
        dto.setAddress(client.getAddress());
        dto.setCity(client.getCity());
        dto.setState(client.getState());
        dto.setZipCode(client.getZipCode());
        dto.setDocumentId(client.getDocumentId());
        dto.setDocumentType(client.getDocumentType());
        dto.setCreatedAt(client.getCreatedAt());
        dto.setUpdatedAt(client.getUpdatedAt());
        return dto;
    }

    public Client toClientEntity(CreateClientRequest request) {
        if (request == null)
            return null;
        Client client = new Client();
        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
        client.setAddress(request.getAddress());
        client.setCity(request.getCity());
        client.setState(request.getState());
        client.setZipCode(request.getZipCode());
        client.setDocumentId(request.getDocumentId());
        client.setDocumentType(request.getDocumentType());
        return client;
    }

    public VehicleDTO toVehicleDTO(Vehicle vehicle) {
        if (vehicle == null)
            return null;
        VehicleDTO dto = new VehicleDTO();
        dto.setId(vehicle.getId());
        dto.setLicensePlate(vehicle.getLicensePlate());
        dto.setVin(vehicle.getVin());
        dto.setBrand(vehicle.getBrand());
        dto.setModel(vehicle.getModel());
        dto.setYear(vehicle.getYear());
        dto.setColor(vehicle.getColor());
        dto.setEngineType(vehicle.getEngineType());
        dto.setMileage(vehicle.getMileage());
        dto.setNotes(vehicle.getNotes());

        if (vehicle.getClient() != null) {
            dto.setClientId(vehicle.getClient().getId());
            dto.setClientName(vehicle.getClient().getFirstName() + " " + vehicle.getClient().getLastName());
        }

        dto.setCreatedAt(vehicle.getCreatedAt());
        dto.setUpdatedAt(vehicle.getUpdatedAt());
        return dto;
    }

    public Vehicle toVehicleEntity(CreateVehicleRequest request) {
        if (request == null)
            return null;
        Vehicle vehicle = new Vehicle();
        vehicle.setLicensePlate(request.getLicensePlate());
        vehicle.setVin(request.getVin());
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setYear(request.getYear());
        vehicle.setColor(request.getColor());
        vehicle.setEngineType(request.getEngineType());
        vehicle.setMileage(request.getMileage());
        vehicle.setNotes(request.getNotes());
        // Client association must be done in Service/Controller via repository,
        // mapper only sets basic fields or we pass client entity.
        // For simple mapping, we leave client null here and set it in service.
        return vehicle;
    }

    public PartDTO toPartDTO(Part part) {
        if (part == null)
            return null;
        PartDTO dto = new PartDTO();
        dto.setId(part.getId());
        dto.setCode(part.getCode());
        dto.setName(part.getName());
        dto.setDescription(part.getDescription());
        dto.setSupplier(part.getSupplier());
        dto.setCategory(part.getCategory());
        dto.setUnitPrice(part.getUnitPrice());
        dto.setQuantity(part.getQuantity());
        dto.setMinimumStock(part.getMinimumStock());
        dto.setExpiryDate(part.getExpiryDate());
        dto.setCreatedAt(part.getCreatedAt());
        dto.setUpdatedAt(part.getUpdatedAt());
        return dto;
    }

    public Part toPartEntity(CreatePartRequest request) {
        if (request == null)
            return null;
        Part part = new Part();
        part.setCode(request.getCode());
        part.setName(request.getName());
        part.setDescription(request.getDescription());
        part.setSupplier(request.getSupplier());
        part.setCategory(request.getCategory());
        part.setUnitPrice(request.getUnitPrice());
        part.setQuantity(request.getQuantity());
        part.setMinimumStock(request.getMinimumStock());
        part.setExpiryDate(request.getExpiryDate());
        return part;
    }

    public ServiceDTO toServiceDTO(Service service) {
        if (service == null)
            return null;
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setBasePrice(service.getBasePrice());
        dto.setEstimatedTime(service.getEstimatedTime());
        dto.setCategory(service.getCategory());
        dto.setIsActive(service.getIsActive());
        dto.setCreatedAt(service.getCreatedAt());
        dto.setUpdatedAt(service.getUpdatedAt());
        return dto;
    }

    public Service toServiceEntity(CreateServiceRequest request) {
        if (request == null)
            return null;
        Service service = new Service();
        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setBasePrice(request.getBasePrice());
        service.setEstimatedTime(request.getEstimatedTime());
        service.setCategory(request.getCategory());
        service.setIsActive(request.getIsActive());
        return service;
    }

    public WorkOrderDTO toWorkOrderDTO(WorkOrder workOrder) {
        if (workOrder == null)
            return null;

        WorkOrderDTO dto = new WorkOrderDTO();
        dto.setId(workOrder.getId());
        dto.setWorkOrderNumber(workOrder.getWorkOrderNumber());
        dto.setStatus(workOrder.getStatus());
        dto.setPriority(workOrder.getPriority());
        dto.setTotalEstimatedCost(workOrder.getTotalEstimatedCost());
        dto.setTotalActualCost(workOrder.getTotalActualCost());
        dto.setEstimatedCompletionDate(workOrder.getEstimatedCompletionDate());
        dto.setActualCompletionDate(workOrder.getActualCompletionDate());
        dto.setNotes(workOrder.getNotes());

        if (workOrder.getClient() != null) {
            dto.setClientId(workOrder.getClient().getId());
            dto.setClientName(workOrder.getClient().getFirstName() + " " + workOrder.getClient().getLastName());
        }

        if (workOrder.getVehicle() != null) {
            dto.setVehicleId(workOrder.getVehicle().getId());
            dto.setVehiclePlate(workOrder.getVehicle().getLicensePlate());
        }

        if (workOrder.getAssignedUser() != null) {
            dto.setAssignedUserId(workOrder.getAssignedUser().getId());
            // Assuming User has name/username
            // dto.setAssignedUserName(workOrder.getAssignedUser().getUsername());
            // I'll check User entity fields. Just ID for now to be safe or assuming
            // username.
            dto.setAssignedUserName(workOrder.getAssignedUser().getUsername());
        }

        dto.setCreatedAt(workOrder.getCreatedAt());
        dto.setUpdatedAt(workOrder.getUpdatedAt());

        if (workOrder.getWorkOrderTasks() != null) {
            dto.setTasks(workOrder.getWorkOrderTasks().stream()
                    .map(this::toWorkOrderTaskDTO)
                    .collect(Collectors.toList()));
        } else {
            dto.setTasks(Collections.emptyList());
        }

        return dto;
    }

    public WorkOrderTaskDTO toWorkOrderTaskDTO(WorkOrderTask task) {
        if (task == null)
            return null;

        WorkOrderTaskDTO dto = new WorkOrderTaskDTO();
        dto.setId(task.getId());
        if (task.getService() != null) {
            dto.setServiceId(task.getService().getId());
            dto.setServiceName(task.getService().getName());
        }
        dto.setActualPrice(task.getActualPrice());
        dto.setQuantity(task.getQuantity());
        dto.setNotes(task.getNotes());
        dto.setStatus(task.getStatus());

        if (task.getWorkOrderTaskParts() != null) {
            dto.setParts(task.getWorkOrderTaskParts().stream()
                    .map(this::toWorkOrderTaskPartDTO)
                    .collect(Collectors.toList()));
        } else {
            dto.setParts(Collections.emptyList());
        }

        return dto;
    }

    public WorkOrderTaskPartDTO toWorkOrderTaskPartDTO(WorkOrderTaskPart part) {
        if (part == null)
            return null;

        WorkOrderTaskPartDTO dto = new WorkOrderTaskPartDTO();
        dto.setId(part.getId());
        if (part.getPart() != null) {
            dto.setPartId(part.getPart().getId());
            dto.setPartName(part.getPart().getName());
        }
        dto.setQuantityUsed(part.getQuantityUsed());
        dto.setUnitPrice(part.getUnitPrice());
        dto.setTotalPrice(part.getTotalPrice());

        return dto;
    }
}
