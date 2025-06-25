package com.indica.med.controller;

import com.indica.med.dto.OrderProductDto;
import com.indica.med.model.OrderProduct;
import com.indica.med.service.order.OrderProductService;
import com.indica.med.service.order.OrderProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orderproducts")
@RequiredArgsConstructor
public class OrderProductController {
    private final OrderProductService orderProductService;

    /**
     * Trả kết quả Orderproduct tìm kiếm bằng ID
     * @param id Id Orderproduct
     * @return Client
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderProductDto> getOrderProductById(@PathVariable Long id) {
        OrderProductDto orderProductDto = orderProductService.findOrderProductById(id);
        return ResponseEntity.ok(orderProductDto);
    }

    /**
     * Tạo 1 đối tượng OrderProduct mới
     * @param orderProductDto OrderProduct mới
     * @return Client
     */
    @PostMapping("/{id}")
    public ResponseEntity<OrderProductDto> createOrderProduct(@RequestBody OrderProductDto orderProductDto) {
        OrderProductDto createOrderProduct = orderProductService.createOrderProduct(orderProductDto);
        return ResponseEntity.ok(createOrderProduct);
    }

    /**
     * Cập nhật Entity thông qua Dto chứa dữ liệu mới cập nhật
     * @param id Id Entoty cần cập nhật
     * @param dto Dto chứa dữ liệu cập nhật
     * @return Client
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrderProductDto> updateOrderProduct(@PathVariable Long id, OrderProductDto dto) {
        OrderProductDto updatedOrderProduct = orderProductService.updateOrderProduct(id,dto);
        return ResponseEntity.ok(updatedOrderProduct);
    }

    /**
     * Xóa 1 entity
     * @param id ID entity cần xóa
     * @return Client
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderProduct(@PathVariable Long id) {
        orderProductService.deleteOrderProduct(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Lấy danh sách OrderProduct từ OrderId
     * @param id OrderId
     * @return Client
     */
    @GetMapping("/order/{id}")
    public ResponseEntity<List<OrderProductDto>> getOrderProductByOrderId(@PathVariable Long id) {
        List<OrderProductDto> list = orderProductService.findOrderProductByOrderId(id);
        return ResponseEntity.ok(list);
    }

    /**
     * Lấy danh sách OrderProduct từ ProductId
     * @param id ProductId
     * @return Client
     */
    @GetMapping("/product/{id}")
    public ResponseEntity<List<OrderProductDto>> getOrderProductByProductId(@PathVariable Long id) {
        List<OrderProductDto> list = orderProductService.findOrderProductByProductId(id);
        return ResponseEntity.ok(list);
    }
}