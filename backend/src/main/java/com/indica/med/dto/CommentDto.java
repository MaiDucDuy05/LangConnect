package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CommentDto {

    private Long id; // Unique identifier for the comment
    private String content; // Content of the comment
    private Date createdAt; // Timestamp when the comment was created
    private Long userId; // ID of the user who created the comment
    private String userName; // Name of the user who created the comment
    private Long postId; // ID of the post the comment is associated with
}