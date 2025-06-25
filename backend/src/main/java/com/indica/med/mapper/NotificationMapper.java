package com.indica.med.mapper;

import com.indica.med.dto.AppointmentDto;
import com.indica.med.dto.NotificationDto;
import com.indica.med.enums.NotificationType;
import com.indica.med.model.Message;
import com.indica.med.model.Notification;
import com.indica.med.model.Post;
import com.indica.med.model.User;
import jdk.jfr.Name;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(source = "notificationMessage", target = "notificationMessage")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "type", target = "type", qualifiedByName = "enumToString")
    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "message.id", target = "messageId")
    @Mapping(source = "isRead", target = "isRead")
    NotificationDto toDto(Notification savedNotification);

    @Mapping(target = "notificationMessage", source = "notificationMessage")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "user", expression = "java(toUser(dto.getUserId(), dto.getUserName()))")
    @Mapping(target = "isRead", source = "isRead")
    @Mapping(target = "type", expression = "java(toNotification(dto.getType()))")
    @Mapping(target = "post", expression = "java(toPost(dto.getPostId()))")
    @Mapping(target = "message", expression = "java(toMessage(dto.getMessageId()))")
    Notification toEntity(NotificationDto dto);

    
    @Mapping(target = "post", ignore = true)
    @Mapping(target = "type", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "message", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "notificationMessage", ignore = true)
    @Mapping(target = "isRead", source = "isRead")
    void updateFromDto(NotificationDto dto, @MappingTarget Notification notification);

    @Named("enumToString")
    default String mapNotificationTypeEnum(NotificationType type) {
        return (type != null ? type.name() : null);
    }

    default NotificationType toNotification(String Notification) {
        return Notification != null ? NotificationType.valueOf(Notification.toUpperCase()) : NotificationType.SYSTEM;
    }

    default User toUser(Long id, String name) {
        if(id == null) return null;
        User user = new User();
        user.setId(id);
        user.setName(name);
        return user;
    }

    default Post toPost(Long id) {
        if(id != null) return null;
        Post post = new Post();
        post.setId(id);
        return post;
    }

    default Message toMessage(Long id) {
        if(id == null) return null;
        Message message = new Message();
        message.setId(id);
        return message;
    }

}
