package com.indica.med.service.post;

import com.indica.med.dto.PostDto;
import com.indica.med.mapper.PostMapper;
import com.indica.med.model.Post;
import com.indica.med.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    @Override
    public PostDto createPost(PostDto postDto) {
        Post post = postMapper.toEntity(postDto);
        Post savedPost = postRepository.save(post);
        return postMapper.toDto(savedPost);
    }

    @Override
    public PostDto getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return postMapper.toDto(post);
    }

    @Override
    public List<PostDto> getPostsByUserId(Long userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        return posts.stream()
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostDto> searchPostsByTitle(String keyword) {
        List<Post> posts = postRepository.findByTitleContainingIgnoreCase(keyword);
        return posts.stream()
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostDto> searchPostsByContent(String keyword) {
        List<Post> posts = postRepository.findByContentContainingIgnoreCase(keyword);
        return posts.stream()
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PostDto updatePost(Long id, PostDto postDto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postMapper.updateFromDto(post, postDto);
        post = postRepository.save(post);
        return postMapper.toDto(post);
    }

    @Override
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found");
        }
        postRepository.deleteById(id);
    }

    @Override
    public List<PostDto> getPostsAfterDate(java.util.Date date) {
        List<Post> posts = postRepository.findByCreatedAtAfter(date);
        return posts.stream()
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostDto> getPostsCreateBetweenBeginDateAndEndDate(Date beginDate, Date endDate) {
        List<Post> posts = postRepository.findByCreatedAtBetween(beginDate,endDate);
        return posts.stream().map(postMapper::toDto).toList();
    }
}
