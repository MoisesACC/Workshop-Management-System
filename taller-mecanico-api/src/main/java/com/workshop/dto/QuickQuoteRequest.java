package com.workshop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class QuickQuoteRequest {
    private Long clientId;
    private Long vehicleId;
    private List<QuoteLineItem> items;
    private String notes;
    private String status;

    @Data
    public static class QuoteLineItem {
        private String description;
        private BigDecimal price;
        private Integer quantity;
        private boolean isPart;
        private Long id; // Reference to Service or Part ID if existing
    }
}
