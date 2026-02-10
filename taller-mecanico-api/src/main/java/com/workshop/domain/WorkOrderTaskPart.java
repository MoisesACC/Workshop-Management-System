package com.workshop.domain;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrderTaskPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer quantityUsed;

    @Column(nullable = false)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Column(nullable = false)
    private LocalDateTime usedAt;

    @ManyToOne
    @JoinColumn(name = "work_order_task_id")
    private WorkOrderTask workOrderTask;

    @ManyToOne
    @JoinColumn(name = "part_id")
    private Part part;
}
