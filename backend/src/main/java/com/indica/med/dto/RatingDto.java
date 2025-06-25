package com.indica.med.dto;

import com.indica.med.enums.RatingType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDto {

    private Long id; // Unique identifier for the rating
    private int score; // Rating score (e.g., 1 to 5)
    private String content; // Content of the rating (optional)
    private String type; // Type of rating (e.g., BUSINESS or PRODUCT)
    private Long customerId; // ID of the user who gave the rating
    private Long businessUserId; // ID of the business user being rated (optional)
    private Long productId; // ID of the product being rated (optional)
}