package com.workshop.controller;

import com.workshop.domain.User;
import com.workshop.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword()); // registerUser encodes it
            user.setEmail(request.getEmail());
            user.setFullName(request.getFullName() != null ? request.getFullName() : request.getUsername());
            user.setRole(
                    request.getRole() != null ? User.Role.valueOf(request.getRole().toUpperCase()) : User.Role.USER);
            user.setIsActive(true);

            return ResponseEntity.ok(userService.registerUser(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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
    public static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private String fullName;
        private String role;
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }
}
