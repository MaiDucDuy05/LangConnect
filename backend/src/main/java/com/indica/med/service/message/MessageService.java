package com.indica.med.service.message;

import com.indica.med.dto.MessageDto;
import com.indica.med.model.Message;

import java.util.List;

public interface MessageService {

    // Send a new message
    MessageDto sendMessage(MessageDto messageDto);

    // Get a message by its ID
    MessageDto getMessageById(Long id);

    // Get all messages sent by a specific user
    List<MessageDto> getMessagesBySenderId(Long senderId);

    // Get all messages received by a specific user
    List<MessageDto> getMessagesByReceiverId(Long receiverId);

    // Get all messages exchanged between two users
    List<MessageDto> getMessagesBetweenUsers(Long senderId, Long receiverId);

    // Delete a message by its ID
    void deleteMessage(Long id);

    // Update a message by its ID
    MessageDto updateMessage(Long id, MessageDto Dto);
}