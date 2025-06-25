package com.indica.med.model;

import com.indica.med.enums.BusinessType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.indica.med.dto.BusinessUserDto;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DiscriminatorValue("BUSINESS_USER")
public class BusinessUser extends User {


    @Column(nullable = true)
    @Enumerated(EnumType.ORDINAL)
    private BusinessType businessType;

    @Column(nullable = true)
    private LocalDate dayStarted; // The first day the business started operating

    @Column(nullable = true)
    private Integer experience;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_specialization",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "specialization_id")
    )
    private Set<Specialization> specializations;

    @OneToMany(mappedBy = "businessUser",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Degree> degrees;

    @OneToMany(mappedBy = "businessUser",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HerbalMedicine> herbalMedicines;

    @OneToMany(mappedBy = "businessUser",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClinicPhoto> clinicPhotos;
}