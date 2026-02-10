package com.workshop.dto;

import lombok.Data;

@Data
public class AddPartRequest {
    private Long partId;
    private Integer quantity;
}
