package com.indica.med.dto;

import com.indica.med.enums.BusinessType;
import com.indica.med.enums.SubscriptionType;
import com.indica.med.model.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class BusinessUserDto extends UserDto {
    private String businessType; // Type of business (e.g., Retail, Service, etc.)
    private LocalDate dayStarted; // The first day the business started operating
    private Integer experience;

    private List<DegreeDto> degrees;
    private List<Rating> ratings;
    private Set<SpecializationDto> specializations;
    private List<ClinicPhotoDto> clinicPhotos;
    private List<HerbalMedicineDto> herbalMedicines;

}