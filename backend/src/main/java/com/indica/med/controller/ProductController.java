package com.indica.med.controller;

import com.indica.med.dto.ProductDto;
import com.indica.med.model.Product;
import com.indica.med.service.product.ProductService;
import com.indica.med.service.product.ProductServiceIplm;
import jakarta.validation.constraints.Past;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto productDto = productService.getProductById(id);
        return ResponseEntity.ok(productDto);
    }

    @PostMapping
    public ResponseEntity<ProductDto> createProductById(@RequestBody ProductDto productDto) {
        ProductDto savedProductDto = productService.createProduct(productDto);
        return ResponseEntity.ok(savedProductDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProductById(@PathVariable Long id, @RequestBody ProductDto productDto) {
        ProductDto updatedProductDto = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProductDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/businessuser/{id}")
    public ResponseEntity<List<ProductDto>> getProductByBusinessUserId(@PathVariable Long businessUserId) {
        List<ProductDto> productDto = productService.findProductByBusinessUserId(businessUserId);
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<ProductDto>> getProductByNameContainingIgnoreCase(@RequestParam String keyword) {
        List<ProductDto> productDto = productService.findProductByNameContainingIgnoreCase(keyword);
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/search/price/greater-than-equal")
    public ResponseEntity<List<ProductDto>> findProductByPriceGreaterThanEqual(@RequestParam BigDecimal price) {
        List<ProductDto> productDto = productService.findProductByPriceGreaterThanEqual(price);
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/search/price/less-than-equal")
    public ResponseEntity<List<ProductDto>> findProductByPriceLessThanEqual(@RequestParam BigDecimal price) {
        List<ProductDto> productDto = productService.findProductByPriceLessThanEqual(price);
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/search/price/range")
    public ResponseEntity<List<ProductDto>> findProductByPriceBetween(@RequestParam BigDecimal minimumPrice, @RequestParam BigDecimal maximumPrice) {
        List<ProductDto> productDto = productService.findProductByPriceBetween(minimumPrice,maximumPrice);
        return ResponseEntity.ok(productDto);
    }
}