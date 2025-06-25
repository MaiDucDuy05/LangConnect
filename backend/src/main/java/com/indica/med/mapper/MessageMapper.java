package com.indica.med.mapper;

import com.indica.med.dto.MessageDto;
import com.indica.med.model.Message;
import com.indica.med.model.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "sentAt", target = "sentAt")
    @Mapping(source = "sender.id", target = "senderId")
    @Mapping(source = "sender.name", target = "senderName")
    @Mapping(source = "receiver.id", target = "receiverId")
    @Mapping(source = "receiver.name", target = "receiverName")
    MessageDto toDto(Message savedMessage);


    @Mapping(target = "sender", expression = "java(toUser(messageDto.getSenderId()))")
    @Mapping(target = "receiver", expression = "java(toUser(messageDto.getReceiverId()))")
    @Mapping(target = "content", source = "content")
    @Mapping(target = "sentAt", source = "sentAt")
    Message toEntity(MessageDto messageDto);


    @Mapping(target = "sender", expression = "java(toUser(messageDto.getSenderId()))")
    @Mapping(target = "receiver", expression = "java(toUser(messageDto.getReceiverId()))")
    @Mapping(target = "content", source = "content")
    @Mapping(target = "sentAt", ignore = true)
    void updateEntity(MessageDto messageDto, @MappingTarget Message existingMessage);


    default User toUser(Long id) {
        if (id == null) return null;
        User user = new User();
        user.setId(id);
        return user;
    }

    default String updateMessage(String message) {
        if(message == null || message.equals("")) return null;
        return message;
    }
}
