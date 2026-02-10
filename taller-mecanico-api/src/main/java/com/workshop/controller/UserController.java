package com.workshop.controller;

import com.workshop.common.BaseController;
import com.workshop.domain.User;
import com.workshop.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController extends BaseController<User, Long, UserService> {
    public UserController(UserService service) {
        super(service);
    }

    @GetMapping("/search/username")
    public ResponseEntity<User> findByUsername(@RequestParam String username) {
        return service.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> existsByEmail(@RequestParam String email) {
        return ResponseEntity.ok(service.existsByEmail(email));
    }

    @GetMapping("/admin/management")
    public ResponseEntity<java.util.List<com.workshop.dto.UserManagementDTO>> getManagementList() {
        return ResponseEntity.ok(service.getUserManagementList());
    }

    @PatchMapping("/{id}/profile")
    public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody ProfileUpdateRequest request) {
        try {
            return ResponseEntity
                    .ok(service.updateProfile(id, request.getFullName(), request.getPhone(), request.getAvatarUrl()));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @lombok.Data
    public static class ProfileUpdateRequest {
        private String fullName;
        private String avatarUrl;
        private String phone;
    }
}