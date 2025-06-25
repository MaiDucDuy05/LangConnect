package com.indica.med.repository;

import com.indica.med.model.BusinessUser;
import com.indica.med.model.Degree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DegreeRepository extends JpaRepository<Degree, Long> {
    List<Degree> findByBusinessUser(BusinessUser businessUser);;
}
