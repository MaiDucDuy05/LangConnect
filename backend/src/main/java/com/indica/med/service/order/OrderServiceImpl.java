 package com.indica.med.service.order;

 import com.indica.med.dto.OrderDto;
 import com.indica.med.mapper.OrderMapper;
 import com.indica.med.mapper.OrderProductMapper;
 import com.indica.med.mapper.ProductMapper;
 import com.indica.med.model.Customer;
 import com.indica.med.model.Order;
 import com.indica.med.model.Product;
 import com.indica.med.repository.CustomerRepository;
 import com.indica.med.repository.OrderRepository;
 import lombok.RequiredArgsConstructor;

 import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.stereotype.Service;

 import java.util.List;
 import java.util.stream.Collectors;

 @Service
 @RequiredArgsConstructor
 public class OrderServiceImpl implements OrderService {

     private final OrderRepository orderRepository;
     private final CustomerRepository customerRepository;
     private final OrderMapper orderMapper;

     @Override
     public OrderDto createOrder(OrderDto orderDto) {
         Order order = orderMapper.toEntity(orderDto);
         Order savedOrder = orderRepository.save(order);
         return orderMapper.toDto(savedOrder);
     }

     @Override
     public OrderDto getOrderById(Long id) {
         Order order = orderRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Order not found"));
         return orderMapper.toDto(order);
     }

     @Override
     public List<OrderDto> getOrdersByCustomerId(Long customerId) {
         List<Order> orders = orderRepository.findByCustomerId(customerId);
         return orders.stream()
                 .map(orderMapper::toDto)
                 .collect(Collectors.toList());
     }

     @Override
     public OrderDto updateOrder(Long id, OrderDto orderDto) {
         Order order = orderRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Order not found"));
         orderMapper.updateFromDto(orderDto, order);

         if (orderDto.getCustomerId() != null) {
             Customer customer = customerRepository.getReferenceById(orderDto.getCustomerId());
             order.setCustomer(customer);
         }
         order = orderRepository.save(order);
         return orderMapper.toDto(order);
     }

     @Override
     public void deleteOrder(Long id) {
         if (!orderRepository.existsById(id)) {
             throw new RuntimeException("Order not found");
         }
         orderRepository.deleteById(id);
     }
 }