package com.workshop.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate maintenanceDate;

    @Column(nullable = false)
    private Integer mileageAtService;

    @Column(nullable = false)
    private String workDescription;

    private String partsReplaced;
    private LocalDate nextMaintenanceDate;
    private Integer nextMaintenanceMileage;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "work_order_id")
    private WorkOrder workOrder;
}