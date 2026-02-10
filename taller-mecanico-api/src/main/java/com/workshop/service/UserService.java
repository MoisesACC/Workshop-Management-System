package com.workshop.service;

import com.workshop.domain.User;
import com.workshop.common.BaseService;
import com.workshop.dto.UserManagementDTO;
import java.util.Optional;
import java.util.List;

public interface UserService extends BaseService<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User registerUser(User user);

    List<UserManagementDTO> getUserManagementList();

    User updateProfile(Long userId, String fullName, String phone, String avatarUrl);
}