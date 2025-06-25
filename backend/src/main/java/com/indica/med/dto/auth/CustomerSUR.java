package com.indica.med.dto.auth;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerSUR extends SignUpRequest {
    private LocalDate dob; // Customer's Date of Birth
    private String gender; // Customer's gender (e.g., Male, Female, Other)
}
