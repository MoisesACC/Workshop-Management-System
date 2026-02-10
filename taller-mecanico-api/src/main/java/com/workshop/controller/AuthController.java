package com.workshop.controller;

import com.workshop.domain.User;
import com.workshop.domain.Client;
import com.workshop.service.UserService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final com.workshop.repository.ClientRepository clientRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El nombre de usuario es obligatorio");
            }
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El correo electrónico es obligatorio");
            }

            User user = new User();
            // Clean username: remove leading/trailing spaces, and convert to lowercase for
            // consistency
            String cleanUsername = request.getUsername().trim().toLowerCase().replaceAll("\\s+", "_");
            user.setUsername(cleanUsername);
            user.setPassword(request.getPassword());
            user.setEmail(request.getEmail().trim().toLowerCase());
            user.setFullName(request.getFullName() != null ? request.getFullName() : request.getUsername());
            User.Role userRole = request.getRole() != null ? User.Role.valueOf(request.getRole().toUpperCase())
                    : User.Role.USER;
            user.setRole(userRole);
            user.setIsActive(true);

            User savedUser = userService.registerUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error interno del servidor: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        java.util.Optional<User> userOpt = userService.findByEmail(request.getEmail());

        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            // Just return the user for now so the frontend can read the role
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private String fullName;
        private String role;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }
}
