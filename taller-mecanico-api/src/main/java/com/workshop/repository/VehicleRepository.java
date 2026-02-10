package com.workshop.repository;

import com.workshop.domain.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    java.util.Optional<Vehicle> findByLicensePlate(String licensePlate);
}
