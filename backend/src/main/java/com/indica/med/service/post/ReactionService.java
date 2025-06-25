package com.indica.med.service.post;

import com.indica.med.dto.RatingDto;
import com.indica.med.dto.ReactionDto;
import com.indica.med.enums.ReactionType;
import com.indica.med.model.Reaction;

import java.util.List;

public interface ReactionService {

    ReactionDto findReactionById(Long id);

    ReactionDto updateReaction(Long id, ReactionDto dto);

    ReactionDto createReaction(ReactionDto dto);

    void deleteReaction(Long id);

    // Find all reactions for a specific post
    List<ReactionDto> findReactionByPostId(Long postId);

    // Find all reactions made by a specific user
    List<ReactionDto> findReactionByUserId(Long userId);

    // Find all reactions of a specific type for a post
    List<ReactionDto> findReactionByPostIdAndType(Long postId, ReactionType type);

    // Find all reactions of a specific type made by a user
    List<ReactionDto> findReactionByUserIdAndType(Long userId, ReactionType type);
}
