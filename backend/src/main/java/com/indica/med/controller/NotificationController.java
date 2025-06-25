package com.indica.med.controller;

import com.indica.med.dto.NotificationDto;
import com.indica.med.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/{id}")
    public ResponseEntity<NotificationDto> getNotificationById(@PathVariable Long id){
        NotificationDto notificationDto = notificationService.getNotificationById(id);
        return ResponseEntity.ok(notificationDto);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<NotificationDto> updateNotificationStatus(@PathVariable Long id){
        NotificationDto notificationDto = notificationService.markAsRead(id);
        return ResponseEntity.ok(notificationDto);
    }

    @PostMapping
    public ResponseEntity<NotificationDto> createNotification(@RequestBody NotificationDto notificationDto) {
        NotificationDto saveNotification = notificationService.createNotification(notificationDto);
        return ResponseEntity.ok(saveNotification);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<NotificationDto>> getNotificationByUserId(@PathVariable Long userId) {
        List<NotificationDto> list = notificationService.getNotificationsByUserId(userId);
        return ResponseEntity.ok(list);
    }

}