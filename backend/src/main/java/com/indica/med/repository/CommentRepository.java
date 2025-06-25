package com.indica.med.repository;

import com.indica.med.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByUserId(Long userId);

    List<Comment> findByPostId(Long appointmentId);

    List<Comment> findByCreatedAtBetween(Date startDate, Date endDate);
}