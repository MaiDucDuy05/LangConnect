package com.indica.med.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.indica.med.dto.PostDto;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title; // Title of the post

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // Content of the post

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt = new Date(); // Timestamp when the post was created

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user; // The user who created the post

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments; // List of comments on the post

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Reaction> reactions; // List of reactions on the post

    public PostDto getpostDto() {
        PostDto postDto = new PostDto();
        postDto.setId(id);
        postDto.setTitle(title);
        postDto.setContent(content);
        postDto.setCreatedAt(createdAt);
        postDto.setUserId(user.getId());
        postDto.setPostedBy(user.getName());
        return postDto;
    }
}