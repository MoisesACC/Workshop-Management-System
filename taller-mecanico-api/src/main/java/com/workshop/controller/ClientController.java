package com.workshop.controller;

import com.workshop.domain.Client;
import com.workshop.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService service;
    private final com.workshop.mapper.WorkshopMapper mapper;

    @GetMapping
    public ResponseEntity<List<com.workshop.dto.ClientDTO>> findAll() {
        List<Client> clients = service.findAll();
        System.out.println("DEBUG: Finding all clients. Count: " + clients.size());
        return ResponseEntity.ok(clients.stream()
                .map(mapper::toClientDTO)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.workshop.dto.ClientDTO> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(mapper::toClientDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<com.workshop.dto.ClientDTO> create(
            @RequestBody com.workshop.dto.CreateClientRequest request) {
        Client entity = mapper.toClientEntity(request);
        Client saved = service.save(entity);
        return ResponseEntity.ok(mapper.toClientDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/document")
    public ResponseEntity<com.workshop.dto.ClientDTO> findByDocumentId(@RequestParam String documentId) {
        return service.findByDocumentId(documentId)
                .map(mapper::toClientDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search/lastname")
    public ResponseEntity<List<com.workshop.dto.ClientDTO>> findByLastName(@RequestParam String lastName) {
        return ResponseEntity.ok(service.findByLastName(lastName).stream()
                .map(mapper::toClientDTO)
                .toList());
    }
}