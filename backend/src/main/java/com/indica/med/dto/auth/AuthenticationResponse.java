package com.indica.med.dto.auth;

import com.indica.med.enums.UserRole;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
    private String jwt;

    private Long userId;

    private String userRole;

}

