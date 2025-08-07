<<<<<<< HEAD
package com.advisor.repository;

import com.advisor.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(Object object);

	boolean existsByEmail(String email);
}
=======
package com.advisor.repository;

import com.advisor.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(Object object);

	boolean existsByEmail(String email);
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
