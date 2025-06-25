package com.indica.med.mapper;

import com.indica.med.dto.OrderDto;
import com.indica.med.dto.OrderProductDto;
import com.indica.med.enums.OrderStatus;
import com.indica.med.model.*;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "customerId", source = "customer.id")
    @Mapping(target = "customerName", source = "customer.name")
    @Mapping(target = "products", source = "orderProducts")
    @Mapping(target = "status", source = "status", qualifiedByName = "toOrderStatusString")
    OrderDto toDto(Order order);

    @Mapping(target = "customer", expression = "java(toCustomer(orderDto.getCustomerId(), orderDto.getCustomerName()))")
    @Mapping(target = "orderProducts", ignore = true) // Handle in service
    @Mapping(target = "status", expression = "java(toOrderStatus(orderDto.getStatus()))")
    Order toEntity(OrderDto orderDto);

    @Mapping(target = "orderProducts", ignore = true) // Handle in service
    @Mapping(target = "customer", ignore = true)
    void updateFromDto(OrderDto orderDto, @MappingTarget Order existingOrder);

    default OrderProductDto toOrderProductDto(OrderProduct op) {
        OrderProductDto dto = new OrderProductDto();
        dto.setId(op.getId());
        dto.setProductId(op.getProduct().getId());
        dto.setProductName(op.getProduct().getName());
        dto.setQuantity(op.getQuantity());
        dto.setPrice(op.getPrice());
        return dto;
    }

    default List<OrderProductDto> mapOrderProducts(List<OrderProduct> orderProducts) {
        return orderProducts.stream()
                .map(this::toOrderProductDto)
                .collect(Collectors.toList());
    }

    default Customer toCustomer(Long id, String name) {
        if (id == null) return null;
        Customer customer = new Customer();
        customer.setId(id);
        customer.setName(name);
        return customer;
    }

    default OrderStatus toOrderStatus(String status) {
        return status != null ? OrderStatus.valueOf(status) : OrderStatus.PENDING;
    }

    @Named("toOrderStatusString")
    default String toOrderStatusString(OrderStatus orderStatus) {
        return orderStatus == null ? OrderStatus.PENDING.name() : orderStatus.name();
    }
}
