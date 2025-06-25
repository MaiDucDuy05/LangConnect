package com.indica.med.controller;

import com.indica.med.dto.OrderDto;
import com.indica.med.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    /**
     * Lấy thông tin đơn hàng theo ID
     * @param id ID của đơn hàng cần lấy
     * @return ResponseEntity chứa thông tin chi tiết của đơn hàng
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        OrderDto getOrder = orderService.getOrderById(id);
        return ResponseEntity.ok(getOrder);
    }

    /**
     * Tạo một đơn hàng mới
     * @param orderDto Dữ liệu đơn hàng mới
     * @return ResponseEntity chứa thông tin của đơn hàng mới được tạo
     */
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createOrder = orderService.createOrder(orderDto);
        return ResponseEntity.ok(createOrder);
    }

    /**
     * Cập nhật thông tin của một đơn hàng
     * @param id ID của đơn hàng cần cập nhật
     * @param orderDto Dữ liệu mới để cập nhật cho đơn hàng
     * @return ResponseEntity chứa thông tin của đơn hàng sau khi được cập nhật
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable Long id,@RequestBody OrderDto orderDto) {
        OrderDto dtoNeedUpdate;
        dtoNeedUpdate = orderService.updateOrder(id, orderDto);
        return ResponseEntity.ok(dtoNeedUpdate);
    }

    /**
     * Xóa một đơn hàng
     * @param id ID của đơn hàng cần xóa
     * @return ResponseEntity trả về trạng thái 204 No Content nếu xóa thành công
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Lấy danh sách đơn hàng của một khách hàng theo ID khách hàng
     * @param id ID của khách hàng
     * @return ResponseEntity chứa danh sách các đơn hàng của khách hàng đó
     */
    @GetMapping("/customer/{id}")
    public ResponseEntity<List<OrderDto>> getOrderByCustomerId(@PathVariable Long id) {
        List<OrderDto> list = orderService.getOrdersByCustomerId(id);
        return ResponseEntity.ok(list);
    }
}