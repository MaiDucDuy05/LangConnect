package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class HerbalMedicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String urlPic; // đường dẫn ảnh chứng nhận

    @Column
    private Date dateOfIssue;

    @Column
    private String awardingBody;

    @Column
    private Boolean isEnable;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private BusinessUser businessUser;
}
