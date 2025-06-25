package com.indica.med.mapper;

import com.indica.med.dto.OrderProductDto;
import com.indica.med.model.OrderProduct;
import com.indica.med.model.Product;
import com.indica.med.model.Order;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrderProductMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "order.id", target = "orderId")  
    @Mapping(source = "product.id", target = "productId")  
    @Mapping(source = "product.name", target = "productName")  
    @Mapping(source = "quantity", target = "quantity")  
    @Mapping(source = "price", target = "price")  
    OrderProductDto toDto(OrderProduct orderProduct);

    @Mapping(source = "orderId", target = "order", qualifiedByName = "toOrderEntity")  
    @Mapping(source = "productId", target = "product", qualifiedByName = "toProductEntity")  
    @Mapping(source = "quantity", target = "quantity")  
    @Mapping(source = "price", target = "price")  
    OrderProduct toEntity(OrderProductDto dto);

    @Mapping(source = "orderId", target = "order", qualifiedByName = "toOrderEntity")
    @Mapping(source = "productId", target = "product", qualifiedByName = "toProductEntity")
    @Mapping(source = "quantity", target = "quantity")
    @Mapping(source = "price", target = "price")
    void updateFromDto(@MappingTarget OrderProduct entity, OrderProductDto dto);

    @Named("toOrderEntity")
    default Order orderIdToOrderEntity(Long id) {
        if (id == null) return null;
        Order order = new Order();
        order.setId(id);
        return order;
    }

    @Named("toProductEntity")
    default Product productIdToProductEntity(Long id) {
        if (id == null) return null;
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
