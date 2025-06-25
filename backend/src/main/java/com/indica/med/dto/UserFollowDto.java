package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserFollowDto {

    private Long id; // ID of the follow relationship
    private Long customerId; // ID of the customer who follows the business
    private String customerName; // Name of the customer
    private Long businessUserId; // ID of the business being followed
    private String businessUserName; // Name of the business
    private LocalDate followDate; // The date the customer started following the business
}