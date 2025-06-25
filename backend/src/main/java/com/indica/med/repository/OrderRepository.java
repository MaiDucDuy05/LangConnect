package com.indica.med.repository;

import com.indica.med.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Find all orders for a specific customer
    List<Order> findByCustomerId(Long customerId);

    // Find all orders with a specific status
    List<Order> findByStatus(String status);

    // Find all orders placed within a specific date range
    List<Order> findByOrderDateBetween(Date startDate, Date endDate);

    // Find all orders with a total amount greater than a specific value
    List<Order> findByTotalAmountGreaterThanEqual(java.math.BigDecimal amount);
}