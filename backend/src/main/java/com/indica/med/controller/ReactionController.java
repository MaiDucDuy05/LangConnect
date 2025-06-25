package com.indica.med.controller;

import com.indica.med.dto.ReactionDto;
import com.indica.med.enums.ReactionType;
import com.indica.med.service.post.ReactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    private final ReactionService reactionService;

    // ====== Lấy reaction theo ID ======
    @GetMapping("/{id}")
    public ResponseEntity<ReactionDto> getReactionById(@PathVariable Long id) {
        ReactionDto reactionDto = reactionService.findReactionById(id);
        return ResponseEntity.ok(reactionDto);
    }

    // ====== Cập nhật reaction ======
    @PutMapping("/{id}")
    public ResponseEntity<ReactionDto> updateReaction(@PathVariable Long id, @RequestBody ReactionDto dto) {
        ReactionDto updatedReaction = reactionService.updateReaction(id, dto);
        return ResponseEntity.ok(updatedReaction);
    }

    // ====== Tạo reaction mới ======
    @PostMapping
    public ResponseEntity<ReactionDto> createReaction(@RequestBody ReactionDto dto) {
        ReactionDto createdReaction = reactionService.createReaction(dto);
        return ResponseEntity.ok(createdReaction);
    }

    // ====== Xóa reaction ======
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReaction(@PathVariable Long id) {
        reactionService.deleteReaction(id);
        return ResponseEntity.noContent().build();
    }

    // ====== Lấy reactions theo Post ID ======
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<ReactionDto>> getReactionsByPostId(@PathVariable Long postId) {
        List<ReactionDto> reactions = reactionService.findReactionByPostId(postId);
        return ResponseEntity.ok(reactions);
    }

    // ====== Lấy reactions theo User ID ======
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReactionDto>> getReactionsByUserId(@PathVariable Long userId) {
        List<ReactionDto> reactions = reactionService.findReactionByUserId(userId);
        return ResponseEntity.ok(reactions);
    }

    // ====== Lấy reactions theo Post ID và Type ======
    @GetMapping("/post/{postId}/type/{type}")
    public ResponseEntity<List<ReactionDto>> getReactionsByPostIdAndType(
            @PathVariable Long postId,
            @PathVariable String type) {
        ReactionType reactionType = ReactionType.valueOf(type.toUpperCase());
        List<ReactionDto> reactions = reactionService.findReactionByPostIdAndType(postId, reactionType);
        return ResponseEntity.ok(reactions);
    }

    // ====== Lấy reactions theo User ID và Type ======
    @GetMapping("/user/{userId}/type/{type}")
    public ResponseEntity<List<ReactionDto>> getReactionsByUserIdAndType(
            @PathVariable Long userId,
            @PathVariable String type) {
        ReactionType reactionType = ReactionType.valueOf(type.toUpperCase());
        List<ReactionDto> reactions = reactionService.findReactionByUserIdAndType(userId, reactionType);
        return ResponseEntity.ok(reactions);
    }
}
