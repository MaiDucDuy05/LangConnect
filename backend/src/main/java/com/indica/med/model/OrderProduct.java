package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import com.indica.med.dto.OrderProductDto;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_products")
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order; // The order this product belongs to

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // The product being ordered

    @Column(nullable = false)
    private int quantity; // Quantity of the product in the order

    @Column(nullable = false)
    private BigDecimal price; // Price of the product at the time of the order

    public OrderProductDto getOrderProductDto() {
        OrderProductDto orderProductDto = new OrderProductDto();
        orderProductDto.setId(this.id);
        orderProductDto.setOrderId(this.order.getId());
        orderProductDto.setProductId(this.product.getId());
        orderProductDto.setProductName(this.product.getName()); // Assuming Product has a `getName` method
        orderProductDto.setQuantity(this.quantity);
        orderProductDto.setPrice(this.price);
        return orderProductDto;
    }
}