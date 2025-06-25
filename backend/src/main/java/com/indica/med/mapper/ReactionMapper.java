package com.indica.med.mapper;


import com.indica.med.dto.ReactionDto;
import com.indica.med.enums.ReactionType;
import com.indica.med.model.Post;
import com.indica.med.model.Reaction;
import com.indica.med.model.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ReactionMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "user.name", target = "reactedBy")
    @Mapping(source = "type", target = "type", qualifiedByName = "reactionTypeToString")
    ReactionDto toDto(Reaction reaction);

    @Mapping(target = "user", expression = "java(toUserEntity(reactionDto.getUserId(), reactionDto.getReactedBy()))")
    @Mapping(target = "post", expression = "java(toPostEntity(reactionDto.getPostId()))")
    @Mapping(source = "type", target = "type", qualifiedByName = "stringToReactionType")
    Reaction toEntity(ReactionDto reactionDto);

    @Mapping(target = "user", expression = "java(toUserEntity(reactionDto.getUserId(), reactionDto.getReactedBy()))")
    @Mapping(target = "post", expression = "java(toPostEntity(reactionDto.getPostId()))")
    @Mapping(source = "type", target = "type", qualifiedByName = "stringToReactionType")
    void updateFromDto(ReactionDto reactionDto, @MappingTarget Reaction reaction);
    

    default User toUserEntity(Long id, String name) {
        if (id == null)
            return null;
        User user = new User();
        user.setId(id);
        user.setName(name);
        return user;
    }
    
    default Post toPostEntity(Long id) {
        if (id == null)
            return null;
        Post post = new Post();
        post.setId(id);
        return post;
    }
    

    @Named("reactionTypeToString")
    default String reactionTypeToString(ReactionType type) {
        return type != null ? type.toString() : null;
    }

    @Named("stringToReactionType")
    default ReactionType stringToReactionType(String type) {
        return type != null ? ReactionType.valueOf(type) : null;
    }
}

