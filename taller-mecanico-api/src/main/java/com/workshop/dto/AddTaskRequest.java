package com.workshop.dto;

import lombok.Data;

@Data
public class AddTaskRequest {
    private Long serviceId;
    private String notes;
}
