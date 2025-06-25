package com.indica.med.repository;

import com.indica.med.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Find customers by a partial match in their name (case-insensitive)
    List<Customer> findByNameContainingIgnoreCase(String name);

    // Find customers by email
    Customer findByEmail(String email);
}