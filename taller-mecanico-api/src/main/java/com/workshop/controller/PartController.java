package com.workshop.controller;

import com.workshop.domain.Part;
import com.workshop.service.PartService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@RequiredArgsConstructor
public class PartController {
    private final PartService service;
    private final com.workshop.mapper.WorkshopMapper mapper;

    @GetMapping
    public ResponseEntity<List<com.workshop.dto.PartDTO>> findAll() {
        return ResponseEntity.ok(service.findAll().stream()
                .map(mapper::toPartDTO)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.workshop.dto.PartDTO> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(mapper::toPartDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<com.workshop.dto.PartDTO> create(@RequestBody com.workshop.dto.CreatePartRequest request) {
        Part entity = mapper.toPartEntity(request);
        Part saved = service.save(entity);
        return ResponseEntity.ok(mapper.toPartDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<com.workshop.dto.PartDTO>> findLowStock() {
        return ResponseEntity.ok(service.findPartsLowStock().stream()
                .map(mapper::toPartDTO)
                .toList());
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<Void> updateStock(@PathVariable Long id, @RequestBody UpdateStockRequest request) {
        service.updateStock(id, request.getQuantity());
        return ResponseEntity.ok().build();
    }

    @Data
    public static class UpdateStockRequest {
        private Integer quantity;
    }
}
