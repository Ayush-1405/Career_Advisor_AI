<<<<<<< HEAD
package com.advisor.entity;

import com.advisor.enums.Role;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
//    private String role;
    private String otp;

    private boolean isVerified;
    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;  // default role

    // Getters and Setters

    

    // 👉 Default constructor
    public  UserEntity() {};

    // 👉 Parameterized constructor (optional)
    public UserEntity(Long id, String name, String email, String password, Role role, String otp, boolean isVerified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.otp = otp;
        this.isVerified = isVerified;
    }

//    public Role getRole() {
//        return role;
//    }
//
//    public void setRole(Role role) {
//        this.role = role;
//    }
    // ✅ Getter and Setter methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public  Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp2) {
        this.otp = otp2;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }
}
=======
package com.advisor.entity;

import com.advisor.enums.Role;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
//    private String role;
    private int otp;

    private boolean isVerified;
    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;  // default role

    // Getters and Setters

    

    // 👉 Default constructor
    public  UserEntity() {};

    // 👉 Parameterized constructor (optional)
    public UserEntity(Long id, String name, String email, String password, Role role, int otp, boolean isVerified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.otp = otp;
        this.isVerified = isVerified;
    }

//    public Role getRole() {
//        return role;
//    }
//
//    public void setRole(Role role) {
//        this.role = role;
//    }
    // ✅ Getter and Setter methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public  Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public int getOtp() {
        return otp;
    }

    public void setOtp( int otp2) {
        this.otp = otp2;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
