package com.workshop.repository;

import com.workshop.domain.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
    Long countByStatus(WorkOrder.Status status);

    @Query("SELECT SUM(w.totalActualCost) FROM WorkOrder w WHERE w.status = 'COMPLETED'")
    BigDecimal sumTotalRevenue();
}
