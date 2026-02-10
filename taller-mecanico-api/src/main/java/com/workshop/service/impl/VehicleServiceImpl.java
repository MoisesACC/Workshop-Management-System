package com.workshop.service.impl;

import com.workshop.domain.Vehicle;
import com.workshop.repository.VehicleRepository;
import com.workshop.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class VehicleServiceImpl implements VehicleService {
    private final VehicleRepository repository;

    @Override
    public List<Vehicle> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Vehicle> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Vehicle save(Vehicle entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Vehicle> findByClientId(Long clientId) {
        return repository.findAll().stream()
                .filter(v -> v.getClient().getId().equals(clientId))
                .collect(Collectors.toList());
    }

    @Override
    public List<Vehicle> findByLicensePlateContaining(String licensePlate) {
        return repository.findAll().stream()
                .filter(v -> v.getLicensePlate().contains(licensePlate))
                .collect(Collectors.toList());
    }
}
