package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentDto {

    private Long id; // Unique identifier for the appointment
    private LocalDateTime appointmentDate; // Date and time of the appointment
    private String reason; // Reason for the appointment
    private Long customerId; // ID of the customer who booked the appointment
    private String customerName; // Name of the customer who booked the appointment
    private Long businessUserId; // ID of the business user with whom the appointment is booked
    private String businessUserName; // Name of the business user with whom the appointment is booked
    private String status; // Status of the appointment (e.g., PENDING, CONFIRMED, CANCELLED)
}