package com.workshop.repository;

import com.workshop.domain.PartMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartMovementRepository extends JpaRepository<PartMovement, Long> {
}
