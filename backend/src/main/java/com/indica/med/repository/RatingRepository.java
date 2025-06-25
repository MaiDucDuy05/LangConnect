package com.indica.med.repository;

import com.indica.med.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    // Find all ratings given by a specific user
    List<Rating> findByCustomerId(Long customerId);

    // Find all ratings for a specific business user
    List<Rating> findByBusinessUserId(Long businessUserId);

    // Find all ratings for a specific product
    List<Rating> findByProductId(Long productId);

    // Find all ratings of a specific type (e.g., BUSINESS or PRODUCT)
    List<Rating> findByType(String type);

    // Find all ratings with a specific score
    List<Rating> findByScore(int score);

    // Find all ratings containing a specific keyword in their content
    List<Rating> findByContentContainingIgnoreCase(String keyword);
}