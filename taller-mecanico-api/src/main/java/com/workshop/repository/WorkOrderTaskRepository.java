package com.workshop.repository;

import com.workshop.domain.WorkOrderTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOrderTaskRepository extends JpaRepository<WorkOrderTask, Long> {
}
