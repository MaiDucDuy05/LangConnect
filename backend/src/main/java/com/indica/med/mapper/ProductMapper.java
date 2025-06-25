package com.indica.med.mapper;

import com.indica.med.dto.ProductDto;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "imageUrl", target = "imageUrl")
    @Mapping(source = "businessUser.id", target = "businessUserId")
    @Mapping(source = "businessUser.name", target = "businessUserName")
    ProductDto toDto(Product entity);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "imageUrl", target = "imageUrl")
    @Mapping(source = "businessUserId", target = "businessUser", qualifiedByName = "userIdToUserEntity")
    Product toEntity(ProductDto dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "dto.name")
    @Mapping(target = "description", source = "dto.description")
    @Mapping(target = "price", source = "dto.price")
    @Mapping(target = "imageUrl", source = "dto.imageUrl")
    @Mapping(target = "businessUser", expression = "java(USER_idToEntity(dto.getBusinessUserId()))")
    void updateFromDto(ProductDto dto, @MappingTarget Product entity);

    @Named("userIdToUserEntity")
    default BusinessUser USER_idToEntity(Long id) {
        if(id == null) return null;
        BusinessUser businessUser = new BusinessUser();
        businessUser.setId(id);
        return businessUser;
    }
}
