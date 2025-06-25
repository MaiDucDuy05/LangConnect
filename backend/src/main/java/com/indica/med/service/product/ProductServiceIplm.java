package com.indica.med.service.product;

import com.indica.med.dto.ProductDto;
import com.indica.med.mapper.ProductMapper;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Product;
import com.indica.med.repository.BusinessUserRepository;
import com.indica.med.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceIplm implements ProductService{
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final BusinessUserRepository businessUserRepository;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);
        Product saveProduct = productRepository.save(product);
        return productMapper.toDto(saveProduct);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return productMapper.toDto(product);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productMapper.updateFromDto(productDto,product);

        if(productDto.getBusinessUserId()!=null) {
            BusinessUser businessUser = businessUserRepository.getReferenceById(product.getId());
            product.setBusinessUser(businessUser);
        }

        Product saveProduct = productRepository.save(product);
        return productMapper.toDto(saveProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        if(!productRepository.existsById(id))
            throw new RuntimeException("Product not found");
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductDto> findProductByBusinessUserId(Long businessUserId) {
        BusinessUser businessUser = businessUserRepository.findById(businessUserId)
                .orElseThrow(() -> new RuntimeException("BusinessUser not found"));

        List<Product> list = productRepository.findByBusinessUserId(businessUserId);
        return list.stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Override
    public List<ProductDto> findProductByNameContainingIgnoreCase(String keyword) {
        List<Product> list = productRepository.findByNameContainingIgnoreCase(keyword);
        return list.stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Override
    public List<ProductDto> findProductByPriceGreaterThanEqual(BigDecimal price) {
        List<Product> list = productRepository.findByPriceGreaterThanEqual(price);
        return list.stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Override
    public List<ProductDto> findProductByPriceLessThanEqual(BigDecimal price) {
        List<Product> list = productRepository.findByPriceLessThanEqual(price);
        return list.stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Override
    public List<ProductDto> findProductByPriceBetween(BigDecimal minimumPrice, BigDecimal maximumPrice) {
        List<Product> list = productRepository.findByPriceBetween(minimumPrice, maximumPrice);
        return list.stream()
                .map(productMapper::toDto)
                .toList();
    }
}
