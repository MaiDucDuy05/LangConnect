package com.indica.med.mapper;

import com.indica.med.dto.SpecializationDto;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Specialization;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SpecializationMapper {

    @Mapping(source = "users", target = "userIds", qualifiedByName = "mapUsersToIds")
    SpecializationDto toDto(Specialization specialization);

    @Mapping(source = "userIds", target = "users", qualifiedByName = "mapIdsToUsers")
    Specialization toEntity(SpecializationDto dto);

    // === Custom mapping methods ===

    @Named("mapUsersToIds")
    default Set<Long> mapUsersToIds(Set<BusinessUser> users) {
        if (users == null) return null;
        return users.stream()
                .map(BusinessUser::getId)
                .collect(Collectors.toSet());
    }

    @Named("mapIdsToUsers")
    default Set<BusinessUser> mapIdsToUsers(Set<Long> ids) {
        if (ids == null) return null;
        return ids.stream()
                .map(id -> {
                    BusinessUser user = new BusinessUser();
                    user.setId(id); // chỉ set ID, không load từ DB
                    return user;
                })
                .collect(Collectors.toSet());
    }
}
