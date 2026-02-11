package com.workshop.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String workOrderNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Priority priority;

    private BigDecimal totalEstimatedCost;
    private BigDecimal totalActualCost;
    private LocalDateTime estimatedCompletionDate;
    private LocalDateTime actualCompletionDate;
    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignedUser;

    @OneToMany(mappedBy = "workOrder")
    private List<WorkOrderTask> workOrderTasks;

    @OneToOne(mappedBy = "workOrder")
    private Invoice invoice;

    @OneToMany(mappedBy = "workOrder")
    private List<WorkOrderHistory> workOrderHistories;

    public enum Status {
        QUOTE, PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    }

    public enum Priority {
        LOW, MEDIUM, HIGH
    }
}