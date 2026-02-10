package com.workshop.controller;

import com.workshop.domain.Vehicle;
import com.workshop.domain.Client;
import com.workshop.service.VehicleService;
import com.workshop.repository.ClientRepository;
import com.workshop.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService service;
    private final ClientRepository clientRepository;
    private final com.workshop.mapper.WorkshopMapper mapper;

    @GetMapping
    public ResponseEntity<List<com.workshop.dto.VehicleDTO>> findAll() {
        return ResponseEntity.ok(service.findAll().stream()
                .map(mapper::toVehicleDTO)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.workshop.dto.VehicleDTO> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(mapper::toVehicleDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<com.workshop.dto.VehicleDTO> create(
            @RequestBody com.workshop.dto.CreateVehicleRequest request) {
        Vehicle entity = mapper.toVehicleEntity(request);
        if (request.getClientId() != null) {
            Client client = clientRepository.findById(request.getClientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Client", "id", request.getClientId()));
            entity.setClient(client);
        }
        Vehicle saved = service.save(entity);
        return ResponseEntity.ok(mapper.toVehicleDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<com.workshop.dto.VehicleDTO>> findByClientId(@PathVariable Long clientId) {
        return ResponseEntity.ok(service.findByClientId(clientId).stream()
                .map(mapper::toVehicleDTO)
                .toList());
    }

    @GetMapping("/search")
    public ResponseEntity<List<com.workshop.dto.VehicleDTO>> findByLicensePlate(@RequestParam String licensePlate) {
        return ResponseEntity.ok(service.findByLicensePlateContaining(licensePlate).stream()
                .map(mapper::toVehicleDTO)
                .toList());
    }
}
