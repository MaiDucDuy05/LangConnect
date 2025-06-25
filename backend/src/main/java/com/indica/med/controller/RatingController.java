package com.indica.med.controller;

import com.indica.med.dto.RatingDto;
import com.indica.med.service.rating.RatingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/ratings")
@RestController
public class RatingController {
    private final RatingService ratingService;

    @PostMapping()
    public ResponseEntity<RatingDto> createRating(@RequestBody RatingDto dto) {
        RatingDto savedRating = ratingService.createRating(dto);
        return ResponseEntity.ok(savedRating);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RatingDto> getRating(@PathVariable Long id) {
        RatingDto Rating = ratingService.findRating(id);
        return ResponseEntity.ok(Rating);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RatingDto> updateRating(@PathVariable Long id, @RequestBody RatingDto dto) {
        RatingDto savedRating = ratingService.updateRating(id,dto);
        return ResponseEntity.ok(savedRating);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingService.deleteRating(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/customer/{customerId}")
    public ResponseEntity<List<RatingDto>> getRatingByCustomerId(@PathVariable Long customerId) {
        List<RatingDto> list = ratingService.findRatingByCustomerId(customerId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/search/businessuser/{businessId}")
    public ResponseEntity<List<RatingDto>> getRatingByBusinessUserId(@PathVariable Long businessUserId) {
        List<RatingDto> list = ratingService.findRatingByBusinessUserId(businessUserId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/search/product/{productId}")
    public ResponseEntity<List<RatingDto>> getRatingByProductId(@PathVariable Long productId) {
        List<RatingDto> list = ratingService.findRatingByProductId(productId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/search/type")
    public ResponseEntity<List<RatingDto>> getRatingByType(@RequestParam String type) {
        List<RatingDto> list = ratingService.findRatingByType(type);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/search/score")
    public ResponseEntity<List<RatingDto>> getRatingByScore(@RequestParam int score) {
        List<RatingDto> list = ratingService.findRatingByScore(score);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/search/content")
    public ResponseEntity<List<RatingDto>> getRatingByRatingContentContainingIgnoreCase(@RequestParam String keyword) {
        List<RatingDto> list = ratingService.findByRatingContentContainingIgnoreCase(keyword);
        return ResponseEntity.ok(list);
    }
}