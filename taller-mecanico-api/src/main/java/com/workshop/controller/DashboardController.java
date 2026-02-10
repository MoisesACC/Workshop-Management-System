package com.workshop.controller;

import com.workshop.repository.PartRepository;
import com.workshop.repository.WorkOrderRepository;
import com.workshop.domain.WorkOrder;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final WorkOrderRepository workOrderRepository;
    private final PartRepository partRepository;
    private final com.workshop.repository.ClientRepository clientRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getStats() {
        DashboardStats stats = new DashboardStats();

        stats.setTotalWorkOrders(workOrderRepository.count());
        stats.setPendingWorkOrders(workOrderRepository.countByStatus(WorkOrder.Status.PENDING));
        stats.setCompletedWorkOrders(workOrderRepository.countByStatus(WorkOrder.Status.COMPLETED));

        BigDecimal revenue = workOrderRepository.sumTotalRevenue();
        stats.setTotalRevenue(revenue != null ? revenue : BigDecimal.ZERO);

        stats.setLowStockParts(partRepository.countLowStockParts());

        List<Activity> activities = new ArrayList<>();

        // Add recent work orders
        workOrderRepository.findAll().stream()
                .limit(3)
                .forEach(wo -> {
                    activities.add(Activity.builder()
                            .title("Orden #" + (wo.getWorkOrderNumber() != null ? wo.getWorkOrderNumber()
                                    : wo.getId().toString()))
                            .subtitle(wo.getClient() != null
                                    ? wo.getClient().getFirstName() + " " + wo.getClient().getLastName()
                                    : "Cliente General")
                            .status(wo.getStatus() == WorkOrder.Status.COMPLETED ? "Listo" : "En Proceso")
                            .time("Activo")
                            .type("order")
                            .build());
                });

        // Add recent client registrations
        clientRepository.findAll().stream()
                .limit(2)
                .forEach(c -> {
                    activities.add(Activity.builder()
                            .title("Nuevo Registro")
                            .subtitle(c.getFirstName() + " " + c.getLastName())
                            .status("Web")
                            .time("Hoy")
                            .type("user")
                            .build());
                });

        stats.setRecentActivities(activities);

        return ResponseEntity.ok(stats);
    }

    @Data
    public static class DashboardStats {
        private Long totalWorkOrders;
        private Long pendingWorkOrders;
        private Long completedWorkOrders;
        private BigDecimal totalRevenue;
        private Long lowStockParts;
        private List<Activity> recentActivities;
    }

    @Data
    @Builder
    public static class Activity {
        private String title;
        private String subtitle;
        private String status;
        private String time;
        private String type; // order, client, stock
    }
}
