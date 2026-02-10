package com.workshop.config;

import com.workshop.domain.*;
import com.workshop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final PartRepository partRepository;
    private final ClientRepository clientRepository;
    private final VehicleRepository vehicleRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            if (userRepository.count() == 0) {
                createUsers();
            }
        };
    }

    private void createUsers() {
        // Essential Admin User
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setEmail("admin@workshop.com");
        admin.setFullName("System Administrator");
        admin.setRole(User.Role.ADMIN);
        admin.setIsActive(true);
        userRepository.save(admin);

        // Optional: Essential Mechanic for testing assignment
        User mechanic = new User();
        mechanic.setUsername("mecanico1");
        mechanic.setPassword(passwordEncoder.encode("mecanico123"));
        mechanic.setEmail("mecanico1@workshop.com");
        mechanic.setFullName("Mecánico Principal");
        mechanic.setRole(User.Role.MECHANIC);
        mechanic.setIsActive(true);
        userRepository.save(mechanic);
    }
}
