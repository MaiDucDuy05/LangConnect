package com.indica.med.service.rating;

import com.indica.med.dto.RatingDto;
import com.indica.med.model.Rating;

import java.util.List;

public interface RatingService {
    RatingDto createRating(RatingDto ratingDto);

    RatingDto updateRating(Long id, RatingDto dto);

    RatingDto findRating(Long id);

    void deleteRating(Long id);

    List<RatingDto> findRatingByCustomerId(Long customerId);

    List<RatingDto> findRatingByBusinessUserId(Long businessUserId);

    List<RatingDto> findRatingByProductId(Long productId);

    List<RatingDto> findRatingByType(String type);

    List<RatingDto> findRatingByScore(int score);

    List<RatingDto> findByRatingContentContainingIgnoreCase(String keyword);
}
