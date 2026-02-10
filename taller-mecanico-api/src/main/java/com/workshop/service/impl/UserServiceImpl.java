package com.workshop.service.impl;

import com.workshop.domain.User;
import com.workshop.repository.UserRepository;
import com.workshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final com.workshop.repository.ClientRepository clientRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public List<com.workshop.dto.UserManagementDTO> getUserManagementList() {
        return repository.findAll().stream().map(user -> {
            com.workshop.domain.Client client = clientRepository.findByUserId(user.getId()).orElse(null);
            boolean isComplete = client != null &&
                    client.getDocumentId() != null &&
                    !client.getDocumentId().startsWith("WEB-") &&
                    client.getAddress() != null;

            return com.workshop.dto.UserManagementDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .role(user.getRole().name())
                    .isActive(user.getIsActive())
                    .clientId(client != null ? client.getId() : null)
                    .isProfileComplete(isComplete)
                    .clientAddress(client != null ? client.getAddress() : null)
                    .clientPhone(client != null ? client.getPhone() : user.getPhone())
                    .build();
        }).toList();
    }

    @Override
    public User updateProfile(Long userId, String fullName, String phone, String avatarUrl) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (fullName != null)
            user.setFullName(fullName);
        if (phone != null)
            user.setPhone(phone);
        if (avatarUrl != null)
            user.setAvatarUrl(avatarUrl);

        // SYNC WITH CLIENT PROFILE
        clientRepository.findByUserId(userId).ifPresent(client -> {
            if (fullName != null) {
                String[] parts = fullName.split(" ", 2);
                client.setFirstName(parts[0]);
                client.setLastName(parts.length > 1 ? parts[1] : "");
            }
            if (phone != null)
                client.setPhone(phone);
            clientRepository.save(client);
        });

        return repository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public User save(User entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public User registerUser(User user) {
        if (existsByUsername(user.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está registrado");
        }
        if (existsByEmail(user.getEmail())) {
            throw new RuntimeException("El correo electrónico ya está registrado");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }
}