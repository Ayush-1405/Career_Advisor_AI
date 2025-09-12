package com.advisor.repository;

//repository/ResumeRepository.java

import com.advisor.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
List<Resume> findByUser_Id(Long userId);
}

