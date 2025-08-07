<<<<<<< HEAD
package com.advisor.repository;

import com.advisor.entity.CareerPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerPathRepository extends JpaRepository<CareerPath, Long> {
    // You can add custom queries here if needed in future
    CareerPath findByTitleIgnoreCase(String title);
}
=======
package com.advisor.repository;

import com.advisor.entity.CareerPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerPathRepository extends JpaRepository<CareerPath, Long> {
    // You can add custom queries here if needed in future
    CareerPath findByTitleIgnoreCase(String title);
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
