package com.indica.med.service.order;

import com.indica.med.dto.OrderProductDto;
import com.indica.med.mapper.OrderMapper;
import com.indica.med.mapper.OrderProductMapper;
import com.indica.med.model.Order;
import com.indica.med.model.OrderProduct;
import com.indica.med.model.Product;
import com.indica.med.repository.OrderProductRepository;
import com.indica.med.repository.OrderRepository;
import com.indica.med.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderProductServiceImpl implements OrderProductService {

    private final OrderProductRepository orderProductRepository;
    private final OrderProductMapper orderProductMapper;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Override
    public OrderProductDto createOrderProduct(OrderProductDto dto) {
        OrderProduct orderProduct = orderProductMapper.toEntity(dto);
        OrderProduct saveOrderProduct = orderProductRepository.save(orderProduct);
        return orderProductMapper.toDto(saveOrderProduct);
    }

    @Override
    public OrderProductDto findOrderProductById(Long id) {
        OrderProduct orderProduct = orderProductRepository.findById(id).orElseThrow(() -> new RuntimeException("OrderProduct not found"));
        return orderProductMapper.toDto(orderProduct);
    }

    @Override
    public List<OrderProductDto> findOrderProductByOrderId(Long id) {
        List<OrderProduct> orderProduct = orderProductRepository.findByOrderId(id);
        return orderProduct.stream().map(orderProductMapper::toDto).toList();
    }

    @Override
    public List<OrderProductDto> findOrderProductByProductId(Long id) {
        List<OrderProduct> orderProduct = orderProductRepository.findByProductId(id);
        return orderProduct.stream().map(orderProductMapper::toDto).toList();
    }

    @Override
    public OrderProductDto updateOrderProduct(Long id, OrderProductDto dto) {
        OrderProduct orderProduct = orderProductRepository.findById(id).orElseThrow(() -> new RuntimeException("OrderProduct not found"));
        orderProductMapper.updateFromDto(orderProduct, dto);

        if (dto.getOrderId() != null) {
            Order order = orderRepository.getReferenceById(dto.getOrderId());
            orderProduct.setOrder(order);
        }

        if (dto.getProductId() != null) {
            Product product = productRepository.getReferenceById(dto.getProductId());
            orderProduct.setProduct(product);
        }

        orderProduct = orderProductRepository.save(orderProduct);

        return orderProductMapper.toDto(orderProduct);
    }

    @Override
    public void deleteOrderProduct(Long id) {
        if(!orderProductRepository.existsById(id)) {
            throw new RuntimeException("OrderProduct not found");
        }
        orderProductRepository.deleteById(id);
    }
}
