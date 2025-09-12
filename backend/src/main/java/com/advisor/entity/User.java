// entity/User.java
package com.advisor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name="users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false)
  private String name;

  @Column(unique = true, nullable=false)
  private String email;

  @Column(nullable=false)
  private String password; // will be BCrypt hashed

  @Enumerated(EnumType.STRING)
  @Column(nullable=false)
  private Role role = Role.USER;

  
}
