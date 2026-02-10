package com.workshop.service.impl;

import com.workshop.domain.Service;
import com.workshop.repository.ServiceRepository;
import com.workshop.service.CatalogService;
import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Transactional
public class CatalogServiceImpl implements CatalogService {
    private final ServiceRepository repository;

    @Override
    public List<Service> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Service> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Service save(Service entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Service> findActiveServices() {
        return repository.findAll().stream()
                .filter(Service::getIsActive)
                .collect(Collectors.toList());
    }
}
