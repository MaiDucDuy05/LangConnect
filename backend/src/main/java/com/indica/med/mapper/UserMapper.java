package com.indica.med.mapper;

import com.indica.med.dto.UserDto;
import com.indica.med.enums.UserRole;
import com.indica.med.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.context.annotation.Primary;


@Mapper(componentModel = "spring", uses = SubscriptionMapper.class)
public interface UserMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "userRole", target = "userRole", qualifiedByName = "UserMapper_userRoleEnumToString")
    @Mapping(source = "phoneNumber", target = "phoneNumber")
    @Mapping(source = "address", target = "address")
    @Mapping(source = "profilePic", target = "profilePic")
    @Mapping(target = "subscriptionId", source = "subscription.id")
    @Mapping(target = "subscriptionPlan", source = "subscription.name")
    UserDto toDto(User user);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "userRole", target = "userRole" ,qualifiedByName = "UserMapper_userRoleStringToEnum")
    @Mapping(source = "phoneNumber", target = "phoneNumber")
    @Mapping(source = "address", target = "address")
    @Mapping(source = "profilePic", target = "profilePic")
    @Mapping(target = "subscription", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "subscriptionEndDate", ignore = true)
    @Mapping(target = "subscriptionStartDate", ignore = true)
    User toEntity(UserDto dto);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "userRole", target = "userRole", qualifiedByName = "UserMapper_userRoleStringToEnum")
    @Mapping(source = "phoneNumber", target = "phoneNumber")
    @Mapping(source = "address", target = "address")
    @Mapping(source = "profilePic", target = "profilePic")
    @Mapping(target = "subscription", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "subscriptionEndDate", ignore = true)
    @Mapping(target = "subscriptionStartDate", ignore = true)
    void updateFromDto(UserDto dto, @MappingTarget User entity);


    @Named("UserMapper_userRoleEnumToString")
    default String userRoleEnumToString(UserRole userRole) {
        return userRole.toString();
    }

    @Named("UserMapper_userRoleStringToEnum")
    default UserRole userRoleStringToEnum(String s) {
        return UserRole.valueOf(s.toUpperCase());
    }
}
