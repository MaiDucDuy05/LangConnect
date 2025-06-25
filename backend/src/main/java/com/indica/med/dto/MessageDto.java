package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class MessageDto {

    private Long id; // Unique identifier for the message
    private String content; // Content of the message
    private Date sentAt; // Timestamp when the message was sent
    private Long senderId; // ID of the sender
    private String senderName; // Name of the sender
    private Long receiverId; // ID of the receiver
    private String receiverName; // Name of the receiver
}