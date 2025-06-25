package com.indica.med.mapper;

import com.indica.med.dto.WorkScheduleDto;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.WorkSchedule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface WorkScheduleMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "dayOfWeek", target = "dayOfWeek")
    @Mapping(source = "startTime", target = "startTime")
    @Mapping(source = "endTime", target = "endTime")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "businessUser.id", target = "userId")
    @Mapping(source = "businessUser.name", target = "userName")
    WorkScheduleDto toDto(WorkSchedule entity);


    @Mapping(source = "dayOfWeek", target = "dayOfWeek")
    @Mapping(source = "startTime", target = "startTime")
    @Mapping(source = "endTime", target = "endTime")
    @Mapping(source = "description", target = "description")
    @Mapping(target = "businessUser", expression = "java(toBusinessUser(dto.getUserId(), dto.getUserName()))")
    WorkSchedule toEntity(WorkScheduleDto dto);


    @Mapping(source = "dayOfWeek", target = "dayOfWeek")
    @Mapping(source = "startTime", target = "startTime")
    @Mapping(source = "endTime", target = "endTime")
    @Mapping(source = "description", target = "description")
    @Mapping(target = "businessUser", ignore = true)
    void updateFromDto(@MappingTarget WorkSchedule entity, WorkScheduleDto dto);


    default BusinessUser toBusinessUser(Long userId, String userName) {
        if(userId == null) return null;
        BusinessUser  businessUser = new BusinessUser();
        businessUser.setId(userId);
        return businessUser;
    }
}
