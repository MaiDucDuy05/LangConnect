package com.indica.med.mapper;

import com.indica.med.dto.RatingDto;
import com.indica.med.enums.RatingType;
import com.indica.med.model.Rating;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Product;
import com.indica.med.model.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface RatingMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "score", target = "score")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "type", target = "type", qualifiedByName = "ratingTypeToString")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "businessUser", target = "businessUserId", qualifiedByName = "mapBusinessUserToId")
    @Mapping(source = "product", target = "productId", qualifiedByName = "mapProductToId")
    RatingDto toDto(Rating rating);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "score", target = "score")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "type", target = "type", qualifiedByName = "stringToRatingType")
    @Mapping(source = "customerId", target = "customer", qualifiedByName = "customerIdToUserEntity")
    @Mapping(source = "businessUserId", target = "businessUser", qualifiedByName = "businessUserIdToBusinessUserEntity")
    @Mapping(source = "productId", target = "product", qualifiedByName = "productIdToProductEntity")
    Rating toEntity(RatingDto dto);

    @Mapping(source = "score", target = "score")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "type", target = "type", qualifiedByName = "stringToRatingType")
    @Mapping(source = "customerId", target = "customer", qualifiedByName = "customerIdToUserEntity")
    @Mapping(source = "businessUserId", target = "businessUser", qualifiedByName = "businessUserIdToBusinessUserEntity")
    @Mapping(source = "productId", target = "product", qualifiedByName = "productIdToProductEntity")
    void updateFromDto(@MappingTarget Rating entity, RatingDto dto);


    @Named("customerIdToUserEntity")
    default User customerIdToUserEntity(Long id) {
        if (id == null) return null;
        User user = new User();
        user.setId(id);
        return user;
    }

    @Named("businessUserIdToBusinessUserEntity")
    default BusinessUser businessUserIdToBusinessUserEntity(Long id) {
        if (id == null) return null;
        BusinessUser businessUser = new BusinessUser();
        businessUser.setId(id);
        return businessUser;
    }

    @Named("productIdToProductEntity")
    default Product productIdToProductEntity(Long id) {
        if (id == null)
            return null;
        Product product = new Product();
        product.setId(id);
        return product;
    }
    
    @Named("ratingTypeToString")
    default String ratingTypeToString(RatingType type) {
        return type != null ? type.toString() : null;
    }

    @Named("stringToRatingType")
    default RatingType stringToRatingType(String type) {
        return type != null ? RatingType.valueOf(type) : null;
    }

    @Named("mapBusinessUserToId")
    default Long mapBusinessUserToId(BusinessUser businessUser) {
        return businessUser != null ? businessUser.getId() : null; 
    }

    @Named("mapProductToId")
    default Long mapProductToId(Product product) {
        return product != null ? product.getId() : null; 
    }
}
