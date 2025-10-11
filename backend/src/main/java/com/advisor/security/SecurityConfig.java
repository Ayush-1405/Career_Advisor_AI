package com.advisor.security;

//security/SecurityConfig.java

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.advisor.service.JwtFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

private final JwtFilter jwtFilter;

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
 http
     .csrf(csrf -> csrf.disable())
     .cors(cors -> cors.configurationSource(corsConfigurationSource()))
     .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
     .authorizeHttpRequests(auth -> auth
         .requestMatchers("/api/auth/**").permitAll()
         .requestMatchers("/api/career-paths/**").permitAll()
         .requestMatchers("/error").permitAll()
         .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
         .requestMatchers("/api/admin/**").hasRole("ADMIN")
         .anyRequest().authenticated()
     )
     .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
     .exceptionHandling(ex -> ex
         .authenticationEntryPoint((request, response, authException) -> {
             response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
             response.getWriter().write("Unauthorized: " + authException.getMessage());
         })
     );
 return http.build();
}

@Bean
public PasswordEncoder passwordEncoder() {
 return new BCryptPasswordEncoder();
}

@Bean
public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
 return config.getAuthenticationManager();
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
 UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
 CorsConfiguration config = new CorsConfiguration();
 config.setAllowCredentials(true);
 config.addAllowedOrigin("http://localhost:3000");
 config.addAllowedOrigin("http://127.0.0.1:3000");
 config.addAllowedOrigin("http://localhost:5500");
 config.addAllowedOrigin("http://127.0.0.1:5500");
 config.addAllowedOrigin("file://");
 config.addAllowedHeader("*");
 config.addAllowedMethod("*");
 config.addExposedHeader("Authorization");
 source.registerCorsConfiguration("/**", config);
 return source;
}
}

