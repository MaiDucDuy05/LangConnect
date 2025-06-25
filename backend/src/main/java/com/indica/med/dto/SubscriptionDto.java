package com.indica.med.dto;

import com.indica.med.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SubscriptionDto {

    private Long id; // ID of the subscription
    private String name; // Name of the subscription plan
    private BigDecimal price; // Price of the subscription plan
    private UserRole userRole; // Role of user this subscription applies to
    private String description; // Optional description of the subscription plan
}