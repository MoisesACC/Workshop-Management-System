package com.workshop.service.impl;

import com.workshop.domain.User;
import com.workshop.domain.Client;
import com.workshop.repository.UserRepository;
import com.workshop.repository.ClientRepository;
import com.workshop.service.UserService;
import com.workshop.dto.UserManagementDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.workshop.domain.Vehicle;
import com.workshop.domain.WorkOrder;
import com.workshop.repository.VehicleRepository;
import com.workshop.repository.WorkOrderRepository;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final ClientRepository clientRepository;
    private final VehicleRepository vehicleRepository;
    private final WorkOrderRepository workOrderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public List<UserManagementDTO> getUserManagementList() {
        return repository.findAll().stream().map(user -> {
            Client client = clientRepository.findByUserId(user.getId()).orElse(null);
            boolean isComplete = client != null &&
                    client.getDocumentId() != null &&
                    !client.getDocumentId().startsWith("WEB-") &&
                    client.getAddress() != null;

            return UserManagementDTO.builder()
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
                    .clientDocumentId(client != null ? client.getDocumentId() : null)
                    .build();
        }).toList();
    }

    @Override
    public User updateProfile(Long userId, String fullName, String phone, String avatarUrl, String documentId,
            String documentType, String address, String city,
            String vehiclePlate, String vehicleBrand, String vehicleModel, Integer vehicleYear, Integer vehicleMileage,
            String vehicleRequirement) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (fullName != null)
            user.setFullName(fullName);
        if (phone != null)
            user.setPhone(phone);
        if (avatarUrl != null)
            user.setAvatarUrl(avatarUrl);

        // SYNC WITH CLIENT PROFILE
        Client client = clientRepository.findByUserId(userId).orElseGet(() -> {
            Client newClient = new Client();
            newClient.setUser(user);
            newClient.setEmail(user.getEmail());
            newClient.setDocumentId("WEB-" + user.getId());
            return newClient;
        });

        if (fullName != null) {
            String[] parts = fullName.split(" ", 2);
            client.setFirstName(parts[0]);
            client.setLastName(parts.length > 1 ? parts[1] : "");
        }
        if (phone != null)
            client.setPhone(phone);
        if (documentId != null)
            client.setDocumentId(documentId);
        if (documentType != null) {
            try {
                client.setDocumentType(Client.DocumentType.valueOf(documentType));
            } catch (Exception e) {
            }
        }
        if (address != null)
            client.setAddress(address);
        if (city != null)
            client.setCity(city);

        client = clientRepository.save(client);

        // VEHICLE INITIAL REGISTRATION
        if (vehiclePlate != null && !vehiclePlate.isEmpty()) {
            Client finalClient = client;
            Vehicle vehicle = vehicleRepository.findByLicensePlate(vehiclePlate).orElseGet(() -> {
                Vehicle newVehicle = new Vehicle();
                newVehicle.setLicensePlate(vehiclePlate);
                newVehicle.setClient(finalClient);
                newVehicle.setVin("PENDIENTE-" + vehiclePlate); // Placeholder until physical inspection
                newVehicle.setColor("A Confirmar");
                newVehicle.setEngineType(Vehicle.EngineType.GASOLINE); // Default
                return newVehicle;
            });

            if (vehicleBrand != null)
                vehicle.setBrand(vehicleBrand);
            if (vehicleModel != null)
                vehicle.setModel(vehicleModel);
            if (vehicleYear != null)
                vehicle.setYear(vehicleYear);
            if (vehicleMileage != null)
                vehicle.setMileage(vehicleMileage);

            vehicle = vehicleRepository.save(vehicle);

            // AUTO-CREATE QUOTE IF REQUIREMENT IS PRESENT
            if (vehicleRequirement != null && !vehicleRequirement.trim().isEmpty()) {
                WorkOrder quote = new WorkOrder();
                quote.setClient(client);
                quote.setVehicle(vehicle);
                quote.setStatus(WorkOrder.Status.QUOTE);
                quote.setPriority(WorkOrder.Priority.MEDIUM);
                quote.setWorkOrderNumber("COT-" + System.currentTimeMillis() % 100000);
                quote.setNotes("Solicitud Web: " + vehicleRequirement);
                quote.setTotalEstimatedCost(BigDecimal.ZERO);
                workOrderRepository.save(quote);
            }
        }

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
        User savedUser = repository.save(user);

        // Auto-create basic Client record for new users
        if (savedUser.getRole() == User.Role.USER) {
            Client client = new Client();
            client.setUser(savedUser);
            client.setEmail(savedUser.getEmail());
            client.setPhone(savedUser.getPhone());
            // Split name if possible
            if (savedUser.getFullName() != null) {
                String[] parts = savedUser.getFullName().split(" ", 2);
                client.setFirstName(parts[0]);
                client.setLastName(parts.length > 1 ? parts[1] : "");
            } else {
                client.setFirstName(savedUser.getUsername());
                client.setLastName("(Web User)");
            }
            client.setDocumentId("WEB-" + savedUser.getId());
            clientRepository.save(client);
        }

        return savedUser;
    }
}