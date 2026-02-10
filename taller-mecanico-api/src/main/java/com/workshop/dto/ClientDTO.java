package com.workshop.dto;

import com.workshop.domain.Client;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ClientDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String documentId;
    private Client.DocumentType documentType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
