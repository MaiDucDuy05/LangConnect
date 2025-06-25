package com.indica.med.service.product;

import com.indica.med.dto.ProductDto;
import com.indica.med.model.Product;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);

    ProductDto getProductById(Long id);

    ProductDto updateProduct(Long id, ProductDto productDto);

    void deleteProduct(Long id);

    List<ProductDto> findProductByBusinessUserId(Long businessUserId);

    List<ProductDto> findProductByNameContainingIgnoreCase(String keyword);

    List<ProductDto> findProductByPriceGreaterThanEqual(BigDecimal price);

    List<ProductDto> findProductByPriceLessThanEqual(BigDecimal price);

    List<ProductDto> findProductByPriceBetween(BigDecimal startPrice, BigDecimal endPrice);
}
