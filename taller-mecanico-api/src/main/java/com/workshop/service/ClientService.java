package com.workshop.service;

import com.workshop.domain.Client;
import com.workshop.common.BaseService;
import java.util.Optional;
import java.util.List;

public interface ClientService extends BaseService<Client, Long> {
    Optional<Client> findByDocumentId(String documentId);

    List<Client> findByLastName(String lastName);

    Optional<Client> findByUserId(Long userId);
}