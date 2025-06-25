package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderProductDto {

    private Long id; // Unique identifier for the order-product relationship
    private Long orderId; // ID of the associated order
    private Long productId; // ID of the associated product
    private String productName; // Name of the product
    private int quantity; // Quantity of the product in the order
    private BigDecimal price; // Price of the product at the time of the order
}