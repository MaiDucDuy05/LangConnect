package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.indica.med.dto.NotificationDto;
import com.indica.med.enums.NotificationType;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String notificationMessage; // Notification message content

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt = new Date(); // Timestamp when the notification was created

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who receives the notification

    @Column(nullable = false)
    private Boolean isRead = false; // Whether the notification has been read

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotificationType type; // Type of notification (e.g., POST, MESSAGE, ORDER)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = true)
    private Post post; // The post related to the notification (optional)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "message_id", nullable = true)
    private Message message; // The message related to the notification (optional)

    public NotificationDto getNotificationDto() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setId(this.id);
        notificationDto.setNotificationMessage(this.notificationMessage);
        notificationDto.setCreatedAt(this.createdAt);
        notificationDto.setUserId(this.user.getId());
        notificationDto.setUserName(this.user.getName());
        notificationDto.setIsRead(this.isRead);
        notificationDto.setType(this.type.name()); // Convert enum to string
        notificationDto.setPostId(this.post != null ? this.post.getId() : null); // Set post ID if applicable
        notificationDto.setMessageId(this.message != null ? this.message.getId() : null); // Set message ID if applicable
        return notificationDto;
    }
}