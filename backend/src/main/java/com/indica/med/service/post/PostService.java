package com.indica.med.service.post;

import com.indica.med.dto.PostDto;
import java.util.List;

public interface PostService {

    // Tạo một bài viết mới
    PostDto createPost(PostDto postDto);

    // Lấy thông tin một bài viết theo ID
    PostDto getPostById(Long id);

    // Lấy tất cả bài viết của một người dùng theo userId
    List<PostDto> getPostsByUserId(Long userId);

    // Lấy bài viết theo tiêu đề (tìm kiếm theo từ khóa)
    List<PostDto> searchPostsByTitle(String keyword);

    //Lấy bài viết dựa trên từ khóa tiêu đề
    List<PostDto> searchPostsByContent(String keyword);

    // Cập nhật thông tin bài viết
    PostDto updatePost(Long id, PostDto postDto);

    // Xóa một bài viết
    void deletePost(Long id);

    // Lấy danh sách bài viết theo ngày tạo
    List<PostDto> getPostsAfterDate(java.util.Date date);

    // Lấy danh sách bài được tạo từ beginDate tới endDate
    List<PostDto> getPostsCreateBetweenBeginDateAndEndDate(java.util.Date beginDate,java.util.Date endDate);
}
