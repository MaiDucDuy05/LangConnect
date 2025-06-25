package com.indica.med.repository;

import com.indica.med.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find all products by a specific business user
    List<Product> findByBusinessUserId(Long businessUserId);

    // Find all products containing a specific keyword in their name
    List<Product> findByNameContainingIgnoreCase(String keyword);

    // Find all products with a price greater than or equal to a specific value
    List<Product> findByPriceGreaterThanEqual(BigDecimal price);

    // Find all products with a price less than or equal to a specific value
    List<Product> findByPriceLessThanEqual(BigDecimal price);

    // Find all products with a price those range between PriceA and PriceB
    List<Product> findByPriceBetween(BigDecimal minimumPrice, BigDecimal maximumPrice);
}