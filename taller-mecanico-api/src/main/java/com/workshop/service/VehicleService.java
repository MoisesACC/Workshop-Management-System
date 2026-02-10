package com.workshop.service;

import com.workshop.domain.Vehicle;
import com.workshop.common.BaseService;
import java.util.List;

public interface VehicleService extends BaseService<Vehicle, Long> {
    List<Vehicle> findByClientId(Long clientId);

    List<Vehicle> findByLicensePlateContaining(String licensePlate);
}
