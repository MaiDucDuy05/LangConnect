package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NotificationDto {

    private Long id; // Unique identifier for the notification
    private String notificationMessage; // Notification message content
    private Date createdAt; // Timestamp when the notification was created
    private Long userId; // ID of the user who receives the notification
    private String userName; // Name of the user who receives the notification
    private Boolean isRead; // Whether the notification has been read
    private String type; // Type of notification (e.g., POST, MESSAGE, ORDER)
    private Long postId; // ID of the related post (if applicable)
    private Long messageId; // ID of the related message (if applicable)
}