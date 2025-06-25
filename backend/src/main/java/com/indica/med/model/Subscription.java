package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import com.indica.med.dto.SubscriptionDto;
import com.indica.med.enums.UserRole;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name; // Name of the subscription plan (e.g., BASIC, PREMIUM)

    @Column(nullable = false)
    private BigDecimal price; // Price of the subscription plan

    @Column(nullable = false)
    private UserRole userRole; // Role of user this subscription applies to (e.g., CUSTOMER, BUSINESS_USER)

    @Column(nullable = true)
    private String description; // Optional description of the subscription plan
}