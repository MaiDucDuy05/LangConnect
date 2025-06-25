package com.indica.med.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.indica.med.enums.RatingType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(1)
    @Max(5)
    private int score; // Rating score, e.g., 1 to 5

    @Column(nullable = true, columnDefinition = "TEXT")
    private String content; 

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RatingType type; // Enum to distinguish between business and product ratings

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private BusinessUser businessUser; // Optional relationship for business user ratings

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Product product; // Optional relationship for product ratings

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User customer; // The user who gave the rating

}