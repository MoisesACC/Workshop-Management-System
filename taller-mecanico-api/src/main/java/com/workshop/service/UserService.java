package com.workshop.service;

import com.workshop.domain.User;
import com.workshop.common.BaseService;
import java.util.Optional;

public interface UserService extends BaseService<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User registerUser(User user);
}