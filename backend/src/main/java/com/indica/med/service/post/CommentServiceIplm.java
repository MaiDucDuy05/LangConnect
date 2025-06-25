package com.indica.med.service.post;

import com.indica.med.dto.CommentDto;
import com.indica.med.mapper.CommentMapper;
import com.indica.med.model.Comment;
import com.indica.med.model.Post;
import com.indica.med.model.User;
import com.indica.med.repository.CommentRepository;
import com.indica.med.repository.PostRepository;
import com.indica.med.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceIplm implements CommentService{
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Override
    public CommentDto createComment(CommentDto dto) {
        Comment comment = commentMapper.toEntity(dto);
        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    @Override
    public CommentDto updateComment(Long id, CommentDto dto) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        commentMapper.updateFromDto(comment,dto);

        if(dto.getUserId()!=null) {
            User user = userRepository.getReferenceById(dto.getUserId());
            comment.setUser(user);
        }

        if(dto.getPostId()!=null) {
            Post post = postRepository.getReferenceById(dto.getPostId());
            comment.setPost(post);
        }

        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    @Override
    public CommentDto getCommentById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        return commentMapper.toDto(comment);
    }

    @Override
    public void deleteComment(Long id) {
        if(!commentRepository.existsById(id)) {
            throw new RuntimeException("Comment not found");
        }
        commentRepository.deleteById(id);
    }

    @Override
    public List<CommentDto> findByUserId(Long userId) {
        List<Comment> list = commentRepository.findByUserId(userId);
        return list.stream().map(commentMapper::toDto).toList();
    }

    @Override
    public List<CommentDto> findByPostId(Long appointmentId) {
        List<Comment> list = commentRepository.findByPostId(appointmentId);
        return list.stream().map(commentMapper::toDto).toList();
    }

    @Override
    public List<CommentDto> findByCreatedAtBetween(Date startDate, Date endDate) {
        List<Comment> list = commentRepository.findByCreatedAtBetween(startDate,endDate);
        return list.stream().map(commentMapper::toDto).toList();
    }
}
