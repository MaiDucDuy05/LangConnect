package com.indica.med.mapper;

import com.indica.med.dto.UserFollowDto;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Customer;
import com.indica.med.model.UserFollow;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserFollowMapper {
    @Mapping(target = "id", source = "id")
    @Mapping(target = "customerId", source = "customer.id")
    @Mapping(target = "customerName", source = "customer.name")
    @Mapping(target = "businessUserId", source = "businessUser.id")
    @Mapping(target = "businessUserName", source = "businessUser.name")
    @Mapping(source = "followDate", target = "followDate")
    UserFollowDto toDto(UserFollow entity);

    @Mapping(target = "customer", expression = "java(toCustomerEntity(dto.getCustomerId(), dto.getCustomerName()))")
    @Mapping(target = "businessUser", expression = "java(toBusEntity(dto.getBusinessUserId(), dto.getBusinessUserName()))")
    @Mapping(source = "followDate", target = "followDate")
    UserFollow toEntity(UserFollowDto dto);

    @Mapping(target = "customer", expression = "java(toCustomerEntity(dto.getCustomerId(), dto.getCustomerName()))")
    @Mapping(target = "businessUser", expression = "java(toBusEntity(dto.getBusinessUserId(), dto.getBusinessUserName()))")
    @Mapping(source = "followDate", target = "followDate")
    void updateFromDto(@MappingTarget UserFollow entity, UserFollowDto dto);

    default Customer toCustomerEntity(Long id, String name) {
        if (id == null)
            return null;
        Customer customer = new Customer();
        customer.setId(id);
        customer.setName(name);
        return customer;
    }
    
    default BusinessUser toBusEntity(Long id, String name) {
        if(id == null) return null;
        BusinessUser businessUser = new BusinessUser();
        businessUser.setName(name);
        businessUser.setId(id);
        return businessUser;
    }
}