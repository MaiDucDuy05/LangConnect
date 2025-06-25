package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PostDto {

    private Long id; // Unique identifier for the post
    private String title; // Title of the post
    private String content; // Content of the post
    private Date createdAt; // Timestamp when the post was created
    private Long userId; // ID of the user who created the post
    private String postedBy; // Name of the user who created the post
}