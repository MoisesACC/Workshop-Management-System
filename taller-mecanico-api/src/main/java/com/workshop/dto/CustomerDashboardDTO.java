package com.workshop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDashboardDTO {
    private VehicleSummary vehicle;
    private ActiveWorkOrder activeOrder;
    private List<MaintenanceSummary> history;
    private List<SystemHealth> healthReport;
    private QuoteSummary currentQuote;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VehicleSummary {
        private String model;
        private String year;
        private String plate;
        private String vin;
        private String color;
        private String image; // URL to a car model image
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActiveWorkOrder {
        private String orderNumber;
        private String status; // RECEPTION, INSPECTION, REPAIRING, TESTING, READY
        private int progress; // 0-100
        private String estimatedDelivery;
        private List<TimelineEvent> timeline;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimelineEvent {
        private String title;
        private String description;
        private String time;
        private String technician;
        private boolean completed;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MaintenanceSummary {
        private String date;
        private String service;
        private String mileage;
        private String cost;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SystemHealth {
        private String name;
        private int health; // 0-100
        private String status; // OPTIMAL, ATTENTION, CRITICAL
        private String icon;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuoteSummary {
        private List<QuoteItem> items;
        private BigDecimal total;
        private boolean approved;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuoteItem {
        private String description;
        private BigDecimal price;
        private boolean isPart;
    }
}
