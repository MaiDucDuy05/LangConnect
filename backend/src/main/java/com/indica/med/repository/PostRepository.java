package com.indica.med.repository;

import com.indica.med.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // Find all posts created by a specific user
    List<Post> findByUserId(Long userId);

    // Find all posts containing a specific keyword in the title
    List<Post> findByTitleContainingIgnoreCase(String keyword);

    // Find all posts containing a specific keyword in the content
    List<Post> findByContentContainingIgnoreCase(String keyword);

    // Find all posts created after a specific date
    List<Post> findByCreatedAtAfter(java.util.Date date);

    //Find all posts created between beginDate and endDate
    List<Post> findByCreatedAtBetween(java.util.Date beginDate, java.util.Date endDate);
}