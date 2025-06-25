package com.indica.med.dto.auth;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


import com.indica.med.enums.BusinessType;
import com.indica.med.model.ClinicPhoto;
import com.indica.med.model.Degree;
import com.indica.med.model.HerbalMedicine;
import com.indica.med.model.Specialization;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessUserSUR extends SignUpRequest {
    private String description; // Description of the business

    private BusinessType businessType; // Changed to enum BusinessType

    private Integer experience;

    private LocalDate dayStarted; // The first day the business started operating

    private Set<Specialization> specializations; // Many-to-many relation for specializations

    private List<Degree> degrees; // One-to-many relation for degrees

    private List<HerbalMedicine> herbalMedicines; // One-to-many relation for herbal medicines

    private List<ClinicPhoto> clinicPhotos; // One-to-many relation for clinic photos
}
