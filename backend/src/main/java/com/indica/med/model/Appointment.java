package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import com.indica.med.enums.AppointmentStatus;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime appointmentDate; // Date and time of the appointment

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason; // Reason for the appointment

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer; // The customer who booked the appointment

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "business_user_id", nullable = false)
    private BusinessUser businessUser; // The business user with whom the appointment is booked

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AppointmentStatus status = AppointmentStatus.PENDING; // Status of the appointment (default: PENDING)
}