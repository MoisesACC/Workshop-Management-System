package com.workshop.repository;

import com.workshop.domain.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {
    @Query("SELECT COUNT(p) FROM Part p WHERE p.quantity <= p.minimumStock")
    Long countLowStockParts();
}
