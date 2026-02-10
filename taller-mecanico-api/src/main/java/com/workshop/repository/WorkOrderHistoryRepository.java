package com.workshop.repository;

import com.workshop.domain.WorkOrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOrderHistoryRepository extends JpaRepository<WorkOrderHistory, Long> {
}
