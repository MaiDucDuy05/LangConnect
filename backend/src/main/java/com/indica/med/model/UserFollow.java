package com.indica.med.model;

import java.time.LocalDate;

import com.indica.med.dto.UserFollowDto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class UserFollow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer; // The customer who follows the business

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_user_id")
    private BusinessUser businessUser; // The business that is being followed

    @Column(nullable = false)
    private LocalDate followDate; // The date the customer started following the business

}
