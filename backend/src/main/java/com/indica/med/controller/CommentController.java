package com.indica.med.controller;

import com.indica.med.dto.CommentDto;
import com.indica.med.service.post.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    // GET /api/comments/{id}
    @GetMapping("/{id}")
    public ResponseEntity<CommentDto> getCommentById(@PathVariable Long id) {
        CommentDto commentDto = commentService.getCommentById(id);
        return ResponseEntity.ok(commentDto);
    }

    // POST /api/comments
    @PostMapping
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        CommentDto createdComment = commentService.createComment(commentDto);
        return ResponseEntity.ok(commentDto);  // Trả về 201 CREATED khi tạo thành công
    }

    // PUT /api/comments/{id}
    @PutMapping("/{id}")
    public ResponseEntity<CommentDto> updateComment(@PathVariable Long id, @RequestBody CommentDto commentDto) {
        CommentDto updatedComment = commentService.updateComment(id, commentDto);
        return ResponseEntity.ok(updatedComment);
    }

    // DELETE /api/comments/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();  // Trả về 204 No Content khi xóa thành công
    }

    // GET /api/comments/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CommentDto>> getCommentsByUserId(@PathVariable Long userId) {
        List<CommentDto> comments = commentService.findByUserId(userId);
        return ResponseEntity.ok(comments);
    }

    // GET /api/comments/post/{postId}
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentDto> comments = commentService.findByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // GET /api/comments/time-range
    @GetMapping("/time-range")
    public ResponseEntity<List<CommentDto>> getCommentsByTimeRange(
            @RequestParam Date startDate,
            @RequestParam Date endDate) {

        List<CommentDto> comments = commentService.findByCreatedAtBetween(startDate, endDate);
        return ResponseEntity.ok(comments);
    }
}
