package com.workshop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserManagementDTO {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private Boolean isActive;
    private Long clientId;
    private Boolean isProfileComplete;
    private String clientAddress;
    private String clientPhone;
}
