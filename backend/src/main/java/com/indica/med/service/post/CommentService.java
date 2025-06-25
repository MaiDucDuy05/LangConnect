package com.indica.med.service.post;

import com.indica.med.dto.CommentDto;
import com.indica.med.model.Comment;

import java.util.Date;
import java.util.List;

public interface CommentService {
    CommentDto createComment(CommentDto dto);

    CommentDto updateComment(Long id, CommentDto dto);

    CommentDto getCommentById(Long id);

    void deleteComment(Long id);

    List<CommentDto> findByUserId(Long userId);

    List<CommentDto> findByPostId(Long appointmentId);

    List<CommentDto> findByCreatedAtBetween(Date startDate, Date endDate);
}
