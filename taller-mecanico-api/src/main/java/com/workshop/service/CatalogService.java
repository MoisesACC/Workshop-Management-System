package com.workshop.service;

import com.workshop.domain.Service;
import com.workshop.common.BaseService;
import java.util.List;

public interface CatalogService extends BaseService<Service, Long> {
    List<Service> findActiveServices();
}
