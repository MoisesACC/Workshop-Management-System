package com.workshop.service;

import com.workshop.domain.Part;
import com.workshop.common.BaseService;
import java.util.List;

public interface PartService extends BaseService<Part, Long> {
    List<Part> findPartsLowStock();

    void updateStock(Long partId, Integer quantity);
}
