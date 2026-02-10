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

    @PatchMapping("/{id}/profile")
    public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody ProfileUpdateRequest request) {
        return service.findById(id).map(user -> {
            if (request.getFullName() != null)
                user.setFullName(request.getFullName());
            if (request.getAvatarUrl() != null)
                user.setAvatarUrl(request.getAvatarUrl());
            if (request.getPhone() != null)
                user.setPhone(request.getPhone());
            return ResponseEntity.ok(service.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }

    @lombok.Data
    public static class ProfileUpdateRequest {
        private String fullName;
        private String avatarUrl;
        private String phone;
    }
}