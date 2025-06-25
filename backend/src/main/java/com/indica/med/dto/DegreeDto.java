package com.indica.med.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
public class DegreeDto {
    @Column
    private String name;

    @Column
    private String urlPic;

    @Column
    private String awardingBody;

    @Column
    private Date dateOfIssue;

    @Column
    private Boolean isEnable = true;
}
