package com.indica.med.mapper;

import com.indica.med.dto.CommentDto;
import com.indica.med.model.Comment;
import com.indica.med.model.Post;
import com.indica.med.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "post.id", target = "postId")
    CommentDto toDto(Comment entity);

    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(target = "user", expression = "java(toUserEntity(dto.getUserId(), dto.getUserName()))")
    @Mapping(target = "post", expression = "java(toPostEntity(dto.getPostId()))")
    Comment toEntity(CommentDto dto);


    @Mapping(source = "content", target = "content", qualifiedByName = "validContent")
    @Mapping(target = "user", expression = "java(toUserEntity(dto.getUserId(), dto.getUserName()))")
    @Mapping(target = "post", expression = "java(toPostEntity(dto.getPostId()))")
    void updateFromDto(@MappingTarget Comment entity, CommentDto dto);

    @Named("validContent")
    default String validContent(String newContent) {
        return (newContent == null || newContent.equals("") ? null : newContent);
    }

    default User toUserEntity(Long userId, String userName) {
        if(userId == null) return null;
        User user = new User();
        user.setId(userId);
        user.setName(userName);
        return user;
    }

    default Post toPostEntity(Long postId) {
        if(postId == null) return null;
        Post post = new Post();
        post.setId(postId);
        return post;
    }
}
