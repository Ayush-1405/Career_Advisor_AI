<<<<<<< HEAD
package com.advisor.dto;

import com.advisor.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    public AuthResponse(String token2) {
		// TODO Auto-generated constructor stub
	}
	private String token;
    private String name;
    private String email;
    private Role role;
    private boolean isVerified;
}
=======
package com.advisor.dto;

import com.advisor.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    public AuthResponse(String token2) {
		// TODO Auto-generated constructor stub
	}
	private String token;
    private String name;
    private String email;
    private Role role;
    private boolean isVerified;
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
