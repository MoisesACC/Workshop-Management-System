package com.workshop.service.impl;

import com.workshop.domain.Part;
import com.workshop.domain.PartMovement;
import com.workshop.repository.PartRepository;
import com.workshop.repository.PartMovementRepository;
import com.workshop.service.PartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PartServiceImpl implements PartService {
    private final PartRepository repository;
    private final PartMovementRepository movementRepository;

    @Override
    public List<Part> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Part> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Part save(Part entity) {
        if (entity.getId() == null) {
            // New part logic could go here
        }
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Part> findPartsLowStock() {
        return repository.findAll().stream()
                .filter(p -> p.getQuantity() <= p.getMinimumStock())
                .collect(Collectors.toList());
    }

    @Override
    public void updateStock(Long partId, Integer quantity) {
        Part part = repository.findById(partId).orElseThrow(() -> new RuntimeException("Part not found"));
        Integer oldQuantity = part.getQuantity();
        part.setQuantity(quantity);
        repository.save(part);

        // Record adjustment movement
        PartMovement movement = new PartMovement();
        movement.setPart(part);
        movement.setQuantity(Math.abs(quantity - oldQuantity));
        movement.setMovementType(PartMovement.MovementType.ADJUSTMENT);
        movement.setMovementDate(LocalDateTime.now());
        movement.setReason("Manual Stock Adjustment");
        movementRepository.save(movement);
    }
}
