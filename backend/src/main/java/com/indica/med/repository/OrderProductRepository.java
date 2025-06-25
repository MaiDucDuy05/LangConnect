package com.indica.med.repository;

import com.indica.med.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {

    // Find all OrderProduct entries for a specific order
    List<OrderProduct> findByOrderId(Long orderId);

    // Find all OrderProduct entries for a specific product
    List<OrderProduct> findByProductId(Long productId);

    // Find all OrderProduct entries for a specific order and product
    List<OrderProduct> findByOrderIdAndProductId(Long orderId, Long productId);
}