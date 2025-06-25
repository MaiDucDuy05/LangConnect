package com.indica.med.service.order;

import com.indica.med.dto.OrderProductDto;
import com.indica.med.model.Order;
import com.indica.med.model.OrderProduct;

import java.util.List;

public interface OrderProductService {
    OrderProductDto createOrderProduct(OrderProductDto dto);

    OrderProductDto findOrderProductById(Long id);

    List<OrderProductDto> findOrderProductByOrderId(Long id);

    List<OrderProductDto> findOrderProductByProductId(Long id);

    OrderProductDto updateOrderProduct(Long id, OrderProductDto dto);

    void deleteOrderProduct(Long id);
}