package com.indica.med.mapper;

import com.indica.med.dto.AppointmentDto;
import com.indica.med.enums.AppointmentStatus;
import com.indica.med.model.Appointment;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Customer;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "businessUser.id", target = "businessUserId")
    @Mapping(source = "businessUser.name", target = "businessUserName")
    @Mapping(source = "status", target = "status", qualifiedByName = "enumToString")
    AppointmentDto toDto(Appointment appointment);

    @Mapping(target = "customer", expression = "java(toCustomer(dto.getCustomerId()))")
    @Mapping(target = "businessUser", expression = "java(toBusinessUser(dto.getBusinessUserId()))")
    @Mapping(target = "status", expression = "java(toStatus(dto.getStatus()))")
    @Mapping(target = "appointmentDate", source = "appointmentDate")
    @Mapping(target = "reason", source = "reason")
    Appointment toEntity(AppointmentDto dto);


    @Mapping(target = "customer", ignore = true) 
    @Mapping(target = "businessUser", ignore = true)
    @Mapping(target = "status", expression = "java(toStatus(dto.getStatus()))")
    void updateFromDto(AppointmentDto dto, @MappingTarget Appointment appointment);

    default Customer toCustomer(Long id) {
        if (id == null) return null;
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }

    default BusinessUser toBusinessUser(Long id) {
        if (id == null) return null;
        BusinessUser user = new BusinessUser();
        user.setId(id);
        return user;
    }

    @Named("enumToString")
    default String mapStatusEnum(AppointmentStatus status) {
        return status != null ? status.name() : null;
    }

    default AppointmentStatus toStatus(String status) {
        return status == null ? AppointmentStatus.valueOf(status.toUpperCase()) : AppointmentStatus.PENDING;
    }
}
