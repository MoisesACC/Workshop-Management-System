package com.workshop.controller;

import com.workshop.domain.*;
import com.workshop.dto.CustomerDashboardDTO;
import com.workshop.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

        private final ClientRepository clientRepository;

        @GetMapping("/{userId}/dashboard")
        public ResponseEntity<CustomerDashboardDTO> getDashboard(@PathVariable Long userId) {
                Client client = clientRepository.findByUserId(userId)
                                .orElse(null);

                if (client == null) {
                        return ResponseEntity.ok(CustomerDashboardDTO.builder()
                                        .customerName("Nuevo Usuario")
                                        .profileComplete(false)
                                        .healthReport(new ArrayList<>())
                                        .history(new ArrayList<>())
                                        .build());
                }

                // Find active work order (most recent not completed/cancelled/quote)
                WorkOrder activeOrder = client.getWorkOrders().stream()
                                .filter(wo -> wo.getStatus() != WorkOrder.Status.COMPLETED
                                                && wo.getStatus() != WorkOrder.Status.CANCELLED
                                                && wo.getStatus() != WorkOrder.Status.QUOTE)
                                .findFirst()
                                .orElse(null);

                // If no active order, maybe take the last completed one?
                if (activeOrder == null) {
                        activeOrder = client.getWorkOrders().stream()
                                        .filter(wo -> wo.getStatus() == WorkOrder.Status.COMPLETED)
                                        .findFirst()
                                        .orElse(null);
                }

                CustomerDashboardDTO.CustomerDashboardDTOBuilder builder = CustomerDashboardDTO.builder();

                builder.customerName(client.getFirstName() + " " + client.getLastName());
                builder.clientId(client.getId());

                // Logic for profile complete (has address, phone, and a real document ID)
                boolean isComplete = client.getAddress() != null &&
                                client.getDocumentId() != null &&
                                !client.getDocumentId().startsWith("WEB-");
                builder.profileComplete(isComplete);

                if (activeOrder != null) {
                        Vehicle v = activeOrder.getVehicle();
                        if (v != null) {
                                builder.vehicle(CustomerDashboardDTO.VehicleSummary.builder()
                                                .model(v.getBrand() + " " + v.getModel())
                                                .year(v.getYear().toString())
                                                .plate(v.getLicensePlate())
                                                .vin(v.getVin() != null ? v.getVin() : "WPOZZZ99ZLS2...")
                                                .color(v.getColor())
                                                .image("https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000")
                                                .build());
                        }

                        // Determine status step
                        String customStatus = "INSPECTION";
                        int progress = 40;
                        if (activeOrder.getStatus() == WorkOrder.Status.IN_PROGRESS) {
                                customStatus = "REPAIRING";
                                progress = 65;
                        } else if (activeOrder.getStatus() == WorkOrder.Status.COMPLETED) {
                                customStatus = "READY";
                                progress = 100;
                        }

                        builder.activeOrder(CustomerDashboardDTO.ActiveWorkOrder.builder()
                                        .orderNumber(activeOrder.getWorkOrderNumber())
                                        .status(customStatus)
                                        .progress(progress)
                                        .estimatedDelivery("Hoy, 14:30 PM")
                                        .timeline(Arrays.asList(
                                                        new CustomerDashboardDTO.TimelineEvent("Recepción y Check-in",
                                                                        "Vehículo ingresado al sistema. Llaves aseguradas.",
                                                                        "09:12 AM", "Admin", true),
                                                        new CustomerDashboardDTO.TimelineEvent("Inspección Completa",
                                                                        "Escaneo digital de 120 puntos finalizado.",
                                                                        "10:45 AM", "M. Silverstone", true),
                                                        new CustomerDashboardDTO.TimelineEvent("Reparación Mecánica",
                                                                        "Prueba de presión del sistema y cambio de manguera.",
                                                                        "En Proceso",
                                                                        "M. Silverstone", false)))
                                        .build());
                }

                // FETCH REAL QUOTE (Latest work order with QUOTE status)
                WorkOrder realQuote = client.getWorkOrders().stream()
                                .filter(wo -> wo.getStatus() == WorkOrder.Status.QUOTE)
                                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                                .findFirst()
                                .orElse(null);

                if (realQuote != null) {
                        List<CustomerDashboardDTO.QuoteItem> quoteItems = new ArrayList<>();
                        BigDecimal total = realQuote.getTotalActualCost() != null ? realQuote.getTotalActualCost()
                                        : BigDecimal.ZERO;

                        if (realQuote.getWorkOrderTasks() != null) {
                                for (WorkOrderTask task : realQuote.getWorkOrderTasks()) {
                                        String desc = task.getService() != null ? task.getService().getName()
                                                        : task.getNotes();
                                        quoteItems.add(new CustomerDashboardDTO.QuoteItem(
                                                        desc != null ? desc : "Servicio", task.getActualPrice(),
                                                        false));

                                        if (task.getWorkOrderTaskParts() != null) {
                                                for (WorkOrderTaskPart tp : task.getWorkOrderTaskParts()) {
                                                        quoteItems.add(new CustomerDashboardDTO.QuoteItem(
                                                                        tp.getPart().getName(), tp.getTotalPrice(),
                                                                        true));
                                                }
                                        }
                                }
                        }

                        builder.currentQuote(CustomerDashboardDTO.QuoteSummary.builder()
                                        .items(quoteItems)
                                        .total(total)
                                        .approved(false)
                                        .build());
                } else {
                        // Placeholder if no real quote found
                        builder.currentQuote(CustomerDashboardDTO.QuoteSummary.builder()
                                        .items(Arrays.asList(new CustomerDashboardDTO.QuoteItem(
                                                        "Inspección de cortesía", BigDecimal.ZERO, false)))
                                        .total(BigDecimal.ZERO)
                                        .approved(true)
                                        .build());
                }

                // Health Report (Premium Mock)
                builder.healthReport(Arrays.asList(
                                new CustomerDashboardDTO.SystemHealth("Motor y Transmisión", 85, "OPTIMAL", "engine"),
                                new CustomerDashboardDTO.SystemHealth("Sistema de Frenado", 45, "ATTENTION", "disc"),
                                new CustomerDashboardDTO.SystemHealth("Suspensión", 95, "OPTIMAL", "shield"),
                                new CustomerDashboardDTO.SystemHealth("Neumáticos", 100, "OPTIMAL", "circle")));

                // FETCH ALL VEHICLES
                List<CustomerDashboardDTO.VehicleSummary> allVehicles = new ArrayList<>();
                if (client.getVehicles() != null) {
                        client.getVehicles().forEach(v -> {
                                allVehicles.add(CustomerDashboardDTO.VehicleSummary.builder()
                                                .model(v.getBrand() + " " + v.getModel())
                                                .year(v.getYear().toString())
                                                .plate(v.getLicensePlate())
                                                .vin(v.getVin())
                                                .color(v.getColor())
                                                .image("https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000") // URL
                                                                                                                                                        // hardcodeada
                                                                                                                                                        // por
                                                                                                                                                        // ahora
                                                .build());
                        });
                }
                builder.allVehicles(allVehicles);

                // POPULATE PERSONAL INFO
                builder.personalInfo(CustomerDashboardDTO.PersonalInfo.builder()
                                .firstName(client.getFirstName())
                                .lastName(client.getLastName())
                                .email(client.getEmail())
                                .phone(client.getPhone())
                                .address(client.getAddress())
                                .city(client.getCity())
                                .documentId(client.getDocumentId())
                                .documentType(client.getDocumentType() != null ? client.getDocumentType().name()
                                                : "DNI")
                                .build());

                return ResponseEntity.ok(builder.build());
        }
}
