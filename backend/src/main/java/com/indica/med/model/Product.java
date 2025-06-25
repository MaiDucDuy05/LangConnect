package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.indica.med.dto.ProductDto;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name; // Name of the product

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description; // Description of the product

    @Column(nullable = false)
    private BigDecimal price; // Price of the product

    @Column(nullable = true)
    private String imageUrl; // URL for the product image

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> orderProducts = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "business_user_id", nullable = false)
    private BusinessUser businessUser; // The business user who owns the product

    // Method to convert Product entity to ProductDto
    public ProductDto getProductDto() {
        ProductDto productDto = new ProductDto();
        productDto.setId(id);
        productDto.setName(name);
        productDto.setDescription(description);
        productDto.setPrice(price);
        productDto.setImageUrl(imageUrl);
        productDto.setBusinessUserId(businessUser.getId());
        productDto.setBusinessUserName(businessUser.getName());
        return productDto;
    }
}