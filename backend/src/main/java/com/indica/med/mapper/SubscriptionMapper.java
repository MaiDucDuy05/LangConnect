package com.indica.med.mapper;

import com.indica.med.dto.SubscriptionDto;
import com.indica.med.enums.UserRole;
import com.indica.med.model.Subscription;
import jdk.jfr.Name;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "userRole", target = "userRole")
    @Mapping(source = "description", target = "description")
    SubscriptionDto toDto(Subscription entity);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "userRole", target = "userRole")
    @Mapping(source = "description", target = "description")
    Subscription toEntity(SubscriptionDto dto);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "userRole", target = "userRole")
    @Mapping(source = "description", target = "description")
    void updateFromDto(@MappingTarget Subscription entity, SubscriptionDto dto);
}
