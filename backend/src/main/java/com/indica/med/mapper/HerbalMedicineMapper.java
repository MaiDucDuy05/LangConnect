package com.indica.med.mapper;

import com.indica.med.dto.HerbalMedicineDto;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.HerbalMedicine;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface HerbalMedicineMapper {

    @Mapping(source = "businessUser.id", target = "businessUserId")
    HerbalMedicineDto toDto(HerbalMedicine herbalMedicine);

    @Mapping(source = "businessUserId", target = "businessUser")
    HerbalMedicine toEntity(HerbalMedicineDto dto);

    @Mapping(source = "businessUserId", target = "businessUser")
    void updateFromDto(HerbalMedicineDto dto, @MappingTarget HerbalMedicine herbalMedicine);

    // Map từ ID sang entity
    default BusinessUser map(Long id) {
        if (id == null) return null;
        BusinessUser user = new BusinessUser();
        user.setId(id);
        return user;
    }

    // Map từ entity sang ID
    default Long map(BusinessUser user) {
        return user != null ? user.getId() : null;
    }
}
