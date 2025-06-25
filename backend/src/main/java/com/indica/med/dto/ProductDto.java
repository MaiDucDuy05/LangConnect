package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDto {

    private Long id; // Unique identifier for the product
    private String name; // Name of the product
    private String description; // Description of the product
    private BigDecimal price; // Price of the product
    private String imageUrl; // URL for the product image
    private Long businessUserId; // ID of the business user who owns the product
    private String businessUserName; // Name of the business user who owns the product
}