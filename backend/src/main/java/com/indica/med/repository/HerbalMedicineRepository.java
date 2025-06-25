package com.indica.med.repository;

import com.indica.med.model.BusinessUser;
import com.indica.med.model.HerbalMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HerbalMedicineRepository  extends JpaRepository<HerbalMedicine, Long> {
    // Tìm các bằng cấp theo ID của BusinessUser
    List<HerbalMedicine> findByBusinessUser(BusinessUser businessUser);
}
