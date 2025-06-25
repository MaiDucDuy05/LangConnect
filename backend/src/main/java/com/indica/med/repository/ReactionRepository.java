package com.indica.med.repository;

import com.indica.med.enums.ReactionType;
import com.indica.med.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    // Find all reactions for a specific post
    List<Reaction> findByPostId(Long postId);

    // Find all reactions made by a specific user
    List<Reaction> findByUserId(Long userId);

    // Find all reactions of a specific type for a post
    List<Reaction> findByPostIdAndType(Long postId, ReactionType type);

    // Find all reactions of a specific type made by a user
    List<Reaction> findByUserIdAndType(Long userId, ReactionType type);
}