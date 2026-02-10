package com.workshop.repository;

import com.workshop.domain.WorkOrderTaskPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOrderTaskPartRepository extends JpaRepository<WorkOrderTaskPart, Long> {
}
