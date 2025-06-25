package com.indica.med.mapper;

import com.indica.med.dto.BusinessUserDto;
import com.indica.med.model.BusinessUser;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface BusinessUserMapper extends UserMapper {

    @InheritConfiguration(name = "toDto")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "businessType", target = "businessType")
    @Mapping(source = "dayStarted", target = "dayStarted")
    @Mapping(source = "experience",target = "experience")
    BusinessUserDto toDto(BusinessUser entity);

    
    @InheritConfiguration(name = "toEntity")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "businessType", target = "businessType")
    @Mapping(source = "dayStarted", target = "dayStarted")
    @Mapping(source = "experience",target = "experience")
    BusinessUser toEntity(BusinessUserDto dto);

}
