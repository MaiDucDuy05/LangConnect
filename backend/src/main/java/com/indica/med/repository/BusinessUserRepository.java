package com.indica.med.repository;

import com.indica.med.enums.BusinessType;
import com.indica.med.model.BusinessUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessUserRepository extends JpaRepository<BusinessUser, Long> {

    Optional<BusinessUser> findById(Long id);
    List<BusinessUser> findByBusinessType(BusinessType businessType);
    List<BusinessUser> findByDescriptionContainingIgnoreCase(String keyword);
    List<BusinessUser> findByDayStartedAfter(java.time.LocalDate date);
}