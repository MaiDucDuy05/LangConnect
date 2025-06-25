package com.indica.med.dto;

import com.indica.med.enums.UserRole;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Long id; // Unique identifier for the user
    private String name; // Name of the user
    private String email; // Email of the user
    private String userRole; // Role of the user
    private String phoneNumber; // User's phone number
    private String address; // User's address
    private String profilePic; // URL or path to the user's profile picture
    private Long subscriptionId; // ID of the subscription plan for the user
    private String subscriptionPlan; // Name of the subscription plan
    private String description;
}