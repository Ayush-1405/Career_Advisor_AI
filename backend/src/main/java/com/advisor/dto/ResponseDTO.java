<<<<<<< HEAD
package com.advisor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseDTO {
    private String message;
    private boolean success;
    private String token;

    public ResponseDTO(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
}
=======
package com.advisor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseDTO {
    private String message;
    private boolean success;
    private String token;

    public ResponseDTO(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
