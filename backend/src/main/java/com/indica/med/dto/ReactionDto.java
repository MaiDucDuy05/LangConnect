package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReactionDto {

    private Long id; // Unique identifier for the reaction
    private String type; // Type of reaction (e.g., LIKE, LOVE, SAD, etc.)
    private Long userId; // ID of the user who reacted
    private String reactedBy; // Name of the user who reacted
    private Long postId; // ID of the post the reaction is associated with
}