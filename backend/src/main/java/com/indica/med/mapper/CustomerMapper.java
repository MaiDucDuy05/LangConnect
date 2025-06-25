package com.indica.med.mapper;

import com.indica.med.dto.CustomerDto;
import com.indica.med.enums.UserRole;
import com.indica.med.model.Customer;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CustomerMapper extends UserMapper {
    @InheritConfiguration(name = "toDto")
    @Mapping(source = "dob", target = "dob")
    @Mapping(source = "gender", target = "gender")
    CustomerDto toDto(Customer customer);

    @InheritConfiguration(name = "toEntity")
    @Mapping(source = "dob", target = "dob")
    @Mapping(source = "gender", target = "gender")
    Customer toEntity(CustomerDto dto);

    @InheritConfiguration(name = "updateFromDto")
    @Mapping(source = "dob", target = "dob")
    @Mapping(source = "gender", target = "gender")
    void updateFromDto(CustomerDto dto, @MappingTarget Customer entity);

}
