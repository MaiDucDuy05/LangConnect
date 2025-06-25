package com.indica.med.dto;

import com.indica.med.enums.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class OrderDto {
    private Long id;
    private Date orderDate;
    private BigDecimal totalAmount;
    private String status;

    private Long customerId;
    private String customerName;

    private List<OrderProductDto> products; 
}
