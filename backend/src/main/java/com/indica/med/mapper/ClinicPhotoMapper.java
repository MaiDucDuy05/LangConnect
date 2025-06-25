package com.indica.med.mapper;

import com.indica.med.dto.ClinicPhotoDto;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.ClinicPhoto;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ClinicPhotoMapper {

    @Mapping(source = "businessUser.id", target = "businessUserId")
    ClinicPhotoDto toDto(ClinicPhoto clinicPhoto);

    @Mapping(source = "businessUserId", target = "businessUser")
    ClinicPhoto toEntity(ClinicPhotoDto dto);

    @Mapping(source = "businessUserId", target = "businessUser")
    void updateFromDto(ClinicPhotoDto dto, @MappingTarget ClinicPhoto clinicPhoto);

    // custom mapping từ id sang BusinessUser entity
    default BusinessUser map(Long id) {
        if (id == null) return null;
        BusinessUser user = new BusinessUser();
        user.setId(id);
        return user;
    }

    // custom mapping từ BusinessUser sang id
    default Long map(BusinessUser user) {
        return user != null ? user.getId() : null;
    }
}
