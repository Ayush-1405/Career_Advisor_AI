package com.advisor.entity;

//entity/Resume.java

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Resume {
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String education;
private String skills;
private String experience;

@ManyToOne(optional=false)
@JoinColumn(name="user_id")
private User user;
}
