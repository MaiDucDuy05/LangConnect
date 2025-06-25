package com.indica.med.repository;

import com.indica.med.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Find all notifications for a specific user
    List<Notification> findByUserId(Long userId);

    // Find all unread notifications for a specific user
    List<Notification> findByUserIdAndIsReadFalse(Long userId);

    // Find all notifications of a specific type for a user
    List<Notification> findByUserIdAndType(Long userId, String type);

    // Find all notifications related to a specific post
    List<Notification> findByPostId(Long postId);

    // Find all notifications related to a specific message
    List<Notification> findByMessageId(Long messageId);
}