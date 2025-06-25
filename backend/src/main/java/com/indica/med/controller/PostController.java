package com.indica.med.controller;

import com.indica.med.dto.PostDto;
import com.indica.med.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    /**
     * Lấy thông tin bài viết theo ID
     * @param id ID của bài viết cần lấy
     * @return ResponseEntity chứa thông tin chi tiết của bài viết
     */
    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long id) {
        PostDto post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    /**
     * Tạo một bài viết mới
     * @param postDto Dữ liệu bài viết mới
     * @return ResponseEntity chứa thông tin của bài viết mới được tạo
     */
    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto) {
        PostDto createdPost = postService.createPost(postDto);
        return ResponseEntity.ok(createdPost);
    }

    /**
     * Cập nhật thông tin của một bài viết
     * @param id ID của bài viết cần cập nhật
     * @param postDto Dữ liệu mới để cập nhật cho bài viết
     * @return ResponseEntity chứa thông tin của bài viết sau khi được cập nhật
     */
    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable Long id, @RequestBody PostDto postDto) {
        PostDto updatedPost = postService.updatePost(id, postDto);
        return ResponseEntity.ok(updatedPost);
    }

    /**
     * Xóa một bài viết
     * @param id ID của bài viết cần xóa
     * @return ResponseEntity trả về trạng thái 204 No Content nếu xóa thành công
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Lấy danh sách bài viết của người dùng theo ID
     * @param userId ID của người dùng
     * @return ResponseEntity chứa danh sách các bài viết của người dùng đó
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>> getPostsByUserId(@PathVariable Long userId) {
        List<PostDto> posts = postService.getPostsByUserId(userId);
        return ResponseEntity.ok(posts);
    }

    /**
     * Tìm kiếm bài viết theo từ khóa trong tiêu đề
     * @param keyword Từ khóa tìm kiếm trong tiêu đề
     * @return ResponseEntity chứa danh sách các bài viết tìm được
     */
    @GetMapping("/search/title")
    public ResponseEntity<List<PostDto>> searchPostsByTitle(@RequestParam String keyword) {
        List<PostDto> posts = postService.searchPostsByTitle(keyword);
        return ResponseEntity.ok(posts);
    }

    /**
     * Tìm kiếm bài viết theo từ khóa trong tiêu đề
     * @param keyword Từ khóa tìm kiếm trong tiêu đề
     * @return ResponseEntity chứa danh sách các bài viết tìm được
     */
    @GetMapping("/search/content")
    public ResponseEntity<List<PostDto>> searchPostsByContent(@RequestParam String keyword) {
        List<PostDto> posts = postService.searchPostsByContent(keyword);
        return ResponseEntity.ok(posts);
    }

    /**
     * Lấy danh sách bài viết được tạo vòa khoảng thời gian cụ thể
     * @param beginDate Ngày mốc
     * @param endDate Ngày chặn
     * @return ResponseEntity chứa danh sách các bài viết
     */
    @GetMapping("/after-date")
    public ResponseEntity<List<PostDto>> getPostsCreateBetweenBeginDateAndEndDate(@RequestParam java.util.Date beginDate, @RequestParam(required = false) java.util.Date endDate) {
        List<PostDto> posts = null;
        if(endDate == null) {
            posts = postService.getPostsAfterDate(endDate);
        }
        else {
            posts = postService.getPostsCreateBetweenBeginDateAndEndDate(beginDate, endDate);
        }
        return ResponseEntity.ok(posts);
    }
}
