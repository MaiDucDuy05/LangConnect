package com.indica.med.mapper;

import com.indica.med.dto.DegreeDto;
import com.indica.med.model.Degree;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DegreeMapper {

    @Mapping(source = "name", target = "name")
    @Mapping(source = "urlPic", target = "urlPic")
    @Mapping(source = "awardingBody", target = "awardingBody")
    @Mapping(source = "dateOfIssue", target = "dateOfIssue")
    @Mapping(source = "isEnable", target = "isEnable")
    DegreeDto toDto(Degree degree);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "urlPic", target = "urlPic")
    @Mapping(source = "awardingBody", target = "awardingBody")
    @Mapping(source = "dateOfIssue", target = "dateOfIssue")
    @Mapping(source = "isEnable", target = "isEnable")
    Degree toEntity(DegreeDto degreeDto);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "urlPic", target = "urlPic")
    @Mapping(source = "awardingBody", target = "awardingBody")
    @Mapping(source = "dateOfIssue", target = "dateOfIssue")
    @Mapping(source = "isEnable", target = "isEnable")
    void updateFromDto(DegreeDto degreeDto, @MappingTarget Degree degree);
}
