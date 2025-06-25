package com.indica.med.repository;

import com.indica.med.model.BusinessUser;
import com.indica.med.model.ClinicPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicPhotoRepository extends JpaRepository<ClinicPhoto, Long> {

    List<ClinicPhoto> findByBusinessUser(BusinessUser user);
}