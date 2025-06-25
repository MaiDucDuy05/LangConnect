package com.indica.med.service.rating;

import com.indica.med.dto.RatingDto;
import com.indica.med.mapper.RatingMapper;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Customer;
import com.indica.med.model.Product;
import com.indica.med.model.Rating;
import com.indica.med.repository.BusinessUserRepository;
import com.indica.med.repository.CustomerRepository;
import com.indica.med.repository.ProductRepository;
import com.indica.med.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingServiceIplm implements RatingService{
    private final RatingRepository ratingRepository;
    private final RatingMapper ratingMapper;
    private final CustomerRepository customerRepository;
    private final BusinessUserRepository businessUserRepository;
    private final ProductRepository productRepository;

    @Override
    public RatingDto createRating(RatingDto ratingDto) {
        Rating rating = ratingMapper.toEntity(ratingDto);
        Rating savedRating = ratingRepository.save(rating);
        return ratingMapper.toDto(savedRating);
    }

    @Override
    public RatingDto updateRating(Long id, RatingDto dto) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rating not found"));
        ratingMapper.updateFromDto(rating,dto);
        if(dto.getProductId()!= null) {
            Product product = productRepository.getReferenceById(dto.getProductId());
            rating.setProduct(product);
        }

        if(dto.getCustomerId()!= null) {
            Customer customer = customerRepository.getReferenceById(dto.getCustomerId());
            rating.setCustomer(customer);
        }

        if(dto.getBusinessUserId()!= null) {
            BusinessUser businessUser = businessUserRepository.getReferenceById(dto.getBusinessUserId());
            rating.setBusinessUser(businessUser);
        }
        rating = ratingRepository.save(rating);
        return ratingMapper.toDto(rating);
    }

    @Override
    public RatingDto findRating(Long id) {
        Rating rating = ratingRepository.findById(id).orElseThrow(() -> new RuntimeException("Rating not found"));
        return ratingMapper.toDto(rating);
    }

    @Override
    public void deleteRating(Long id) {
        if(!ratingRepository.existsById(id)) throw new RuntimeException("Rating not found");
        ratingRepository.deleteById(id);
    }

    @Override
    public List<RatingDto> findRatingByCustomerId(Long customerId) {
        List<Rating> ratingDtoList = ratingRepository.findByCustomerId(customerId);
        return ratingDtoList.stream().map(ratingMapper::toDto).toList();
    }

    @Override
    public List<RatingDto> findRatingByBusinessUserId(Long businessUserId) {
        List<Rating> ratingDtoList = ratingRepository.findByBusinessUserId(businessUserId);
        return ratingDtoList.stream().map(ratingMapper::toDto).toList();
    }

    @Override
    public List<RatingDto> findRatingByProductId(Long productId) {
        List<Rating> ratingDtoList = ratingRepository.findByProductId(productId);
        return ratingDtoList.stream().map(ratingMapper::toDto).toList();
    }

    @Override
    public List<RatingDto> findRatingByType(String type) {
        List<Rating> ratingDtoList = ratingRepository.findByType(type);
        return ratingDtoList.stream().map(ratingMapper::toDto).toList();
    }

    @Override
    public List<RatingDto> findRatingByScore(int score) {
        List<Rating> ratingDtoList = ratingRepository.findByScore(score);
        return ratingDtoList.stream().map(ratingMapper::toDto).toList();
    }

    @Override
    public List<RatingDto> findByRatingContentContainingIgnoreCase(String keyword) {
        List<Rating> ratingDtoList = ratingRepository.findByContentContainingIgnoreCase(keyword);
        return ratingDtoList.stream().map(ratingMapper::toDto).toList();
    }
}
