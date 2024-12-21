package org.rest.blog_app_backend.service;

import org.rest.blog_app_backend.entity.Comment;
import org.rest.blog_app_backend.entity.Post;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PostService {

    Post createPost(Post post,String jwt);
    Post findPostById(String postId);

    Post likePost(String postId,String userId);
    Post disLikePost(String postId,String userId);

    Post commentPost(String postId, String jwt, Comment comment);

    void deletePost(String postId);

    Post updatePost(Post post);

    Page<Post> getAllPost(int pageNumber, int pageSize);

    Page<Post> getPostBySearch(String title,int pageNumber,int pageSize);

    List<Post> getPostByDate();

    List<Post> getPopularPost();

    List<Post> getRandomPost();

    Page<Post> getPostByCategory(String category,int pageNumber,int pageSize);
}
