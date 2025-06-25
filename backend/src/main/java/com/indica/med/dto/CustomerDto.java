package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class CustomerDto extends UserDto {
    private LocalDate dob; 
    private String gender;
}