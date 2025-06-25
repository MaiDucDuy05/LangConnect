package com.indica.med.repository;

import com.indica.med.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    //Fin message by ID

    // Find all messages sent by a specific user
    List<Message> findBySenderId(Long senderId);

    // Find all messages received by a specific user
    List<Message> findByReceiverId(Long receiverId);

    // Find all messages exchanged between two users
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
        Long senderId1, Long receiverId1, Long senderId2, Long receiverId2);

    // Find all messages containing a specific keyword in their content
    List<Message> findByContentContainingIgnoreCase(String keyword);
}