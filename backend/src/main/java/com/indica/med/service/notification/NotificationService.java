package com.indica.med.service.notification;

import com.indica.med.dto.NotificationDto;

import java.util.List;

public interface NotificationService {

    // Create a new notification
    NotificationDto createNotification(NotificationDto notificationDto);

    // Get a notification by its ID
    NotificationDto getNotificationById(Long id);

    // Get all notifications for a specific user
    List<NotificationDto> getNotificationsByUserId(Long userId);

    // Mark a notification as read
    NotificationDto markAsRead(Long id);

    // Delete a notification by its ID
    void deleteNotification(Long id);
}