package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.indica.med.dto.OrderDto;
import com.indica.med.enums.OrderStatus;

@Getter
@Setter
@NoArgsConstructor
@Table(name = "orders")
@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date orderDate = new Date(); // Date when the order was placed

    @Column(nullable = false)
    private BigDecimal totalAmount; // Total amount for the order

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status = OrderStatus.PENDING; // Status of the order (default: PENDING)

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer; // The customer who placed the order

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> orderProducts = new ArrayList<>();

    public OrderDto getOrderDto() {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(this.getId());
        orderDto.setOrderDate(this.getOrderDate());
        orderDto.setTotalAmount(this.getTotalAmount());
        orderDto.setStatus(String.valueOf(this.getStatus()));
        orderDto.setCustomerId(this.getCustomer().getId());
        orderDto.setCustomerName(this.getCustomer().getName());

        orderDto.setProducts(this.orderProducts.stream()
            .map(OrderProduct::getOrderProductDto)
            .collect(Collectors.toList()));

        return orderDto;
    }
}