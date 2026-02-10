package com.workshop.service.impl;

import com.workshop.domain.Client;
import com.workshop.repository.ClientRepository;
import com.workshop.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientServiceImpl implements ClientService {
    private final ClientRepository repository;

    @Override
    public List<Client> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Client> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Client save(Client entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Client> findByDocumentId(String documentId) {
        return repository.findAll().stream()
                .filter(c -> c.getDocumentId().equals(documentId))
                .findFirst();
    }

    @Override
    public List<Client> findByLastName(String lastName) {
        return repository.findAll().stream()
                .filter(c -> c.getLastName().toLowerCase().contains(lastName.toLowerCase()))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Client> findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }
}