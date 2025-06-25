package com.indica.med.service.order;

import com.indica.med.dto.OrderDto;

import java.util.List;

public interface OrderService {

    // Create a new order
    OrderDto createOrder(OrderDto orderDto);

    // Get an order by its ID
    OrderDto getOrderById(Long id);

    // Get all orders for a specific customer
    List<OrderDto> getOrdersByCustomerId(Long customerId);

    // Update an existing order
    OrderDto updateOrder(Long id, OrderDto orderDto);

    // Delete an order by its ID
    void deleteOrder(Long id);
}