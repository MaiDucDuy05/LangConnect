package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class HerbalMedicineDto {
    private Long id;
    private String name;
    private String urlPic;
    private Date dateOfIssue;
    private String awardingBody;
    private Boolean isEnable;
    private Long businessUserId;
}
