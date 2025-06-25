package com.indica.med.mapper;

import com.indica.med.dto.PostDto;
import com.indica.med.model.Post;
import com.indica.med.model.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PostMapper {

    // ====== Entity → DTO ======
    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.name", target = "postedBy")
    PostDto toDto(Post post);

    @Mapping(source = "title", target = "title")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "userId", target = "user", qualifiedByName = "userIdToUserEntity")
    Post toEntity(PostDto dto);

    @Mapping(source = "title", target = "title")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "userId", target = "user", qualifiedByName = "userIdToUserEntity")
    void updateFromDto(@MappingTarget Post entity, PostDto dto);

    // ====== Customer Conversion ======
    @Named("userIdToUserEntity")
    default User userIdToUserEntity(Long id) {
        if (id == null) return null;
        User user = new User();
        user.setId(id);
        return user;
    }
}
