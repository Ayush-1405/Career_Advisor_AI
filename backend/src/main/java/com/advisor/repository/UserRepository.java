package com.advisor.repository;

//repository/UserRepository.java


import com.advisor.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
Optional<User> findByEmail(String email);
boolean existsByEmail(String email);
long countByRole(Role user);
}
