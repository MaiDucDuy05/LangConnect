package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ClinicPhotoDto {
    private Long id;
    private String url;
    private Date dateOfIssue;
    private Long businessUserId; // Lưu ID thay vì entity
}
