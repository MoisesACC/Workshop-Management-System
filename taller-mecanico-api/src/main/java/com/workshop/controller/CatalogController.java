package com.workshop.controller;

import com.workshop.domain.Service;
import com.workshop.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class CatalogController {
    private final CatalogService service;
    private final com.workshop.mapper.WorkshopMapper mapper;

    @GetMapping
    public ResponseEntity<List<com.workshop.dto.ServiceDTO>> findAll() {
        return ResponseEntity.ok(service.findAll().stream()
                .map(mapper::toServiceDTO)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.workshop.dto.ServiceDTO> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(mapper::toServiceDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<com.workshop.dto.ServiceDTO> create(
            @RequestBody com.workshop.dto.CreateServiceRequest request) {
        Service entity = mapper.toServiceEntity(request);
        Service saved = service.save(entity);
        return ResponseEntity.ok(mapper.toServiceDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active")
    public ResponseEntity<List<com.workshop.dto.ServiceDTO>> findActiveServices() {
        return ResponseEntity.ok(service.findActiveServices().stream()
                .map(mapper::toServiceDTO)
                .toList());
    }
}
