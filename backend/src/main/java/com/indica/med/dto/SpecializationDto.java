package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
@Getter
@Setter
public class SpecializationDto {
    private Long id;
    private String name;
    private String description;
    private Set<Long> userIds;
}
