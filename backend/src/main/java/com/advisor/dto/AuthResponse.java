package com.advisor.dto;

import lombok.*;

@Getter @Setter @AllArgsConstructor
public class AuthResponse {
  private String token;
  private String role;
  private String email;
  private String name;
}