package org.rest.blog_app_backend.service.impl;

import org.rest.blog_app_backend.entity.Comment;
import org.rest.blog_app_backend.entity.Post;
import org.rest.blog_app_backend.entity.User;
import org.rest.blog_app_backend.exception.HandlePostNotFoundException;
import org.rest.blog_app_backend.exception.InvalidPostException;
import org.rest.blog_app_backend.exception.PostNotFoundException;
import org.rest.blog_app_backend.repository.CommentRepository;
import org.rest.blog_app_backend.repository.PostRepository;
import org.rest.blog_app_backend.service.PostService;
import org.rest.blog_app_backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;
    public PostServiceImpl(PostRepository postRepository, CommentRepository commentRepository, UserService userService){
        this.postRepository=postRepository;
        this.commentRepository = commentRepository;
        this.userService=userService;
    }

    public Post createPost(Post post,String jwt){
        validatePost(post);
        post.setPostDate(LocalDateTime.now());
        User user=userService.findUserByToken(jwt);
        post.setAuthor(user);
        return postRepository.save(post);
    }

    public void validatePost(Post post){
        if (post==null){
            throw new InvalidPostException("post cannot be null");
        }
        if(!StringUtils.hasText(post.getTitle())){
            throw new InvalidPostException("title cannot be empty");
        }
        if(!StringUtils.hasText(post.getContent())){
            throw new InvalidPostException("content cannot be empty");
        }
        if(!StringUtils.hasText(post.getFeaturedImage())){
        throw new InvalidPostException("image cannot be empty");
    }
    }

    public Post findPostById(String postId){
        Post post=postRepository.findById(postId)
                .orElseThrow(()->new HandlePostNotFoundException("no post found with this id"));
        return post;
    }

    @Override
    public Post likePost(String postId, String userId) {
        User user=userService.findByUserId(userId);
        Post post=findPostById(postId);
        if (!post.getLiked().contains(user)) {
            post.getLiked().add(user);
        }
        if (post.getDisliked().contains(user)){
            post.getDisliked().remove(user);
        }
        return postRepository.save(post);
    }

    @Override
    public Post disLikePost(String postId, String userId) {
        User user=userService.findByUserId(userId);
        Post post=findPostById(postId);
        if (!post.getDisliked().contains(user)) {
            post.getDisliked().add(user);
        }
        if (post.getLiked().contains(user)){
            post.getLiked().remove(user);
        }
        return postRepository.save(post);
    }

    @Override
    public Post commentPost(String postId, String jwt,Comment comment) {
        User user=userService.findUserByToken(jwt);
        Post post=findPostById(postId);
        comment.setTitle(comment.getTitle());
        comment.setPostId(postId);
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());
        commentRepository.save(comment);
        post.getComments().add(comment);
        return postRepository.save(post);
    }

    @Override
    @Transactional
    public void deletePost(String postId) {
        Post post=postRepository.findById(postId).orElseThrow(()->new PostNotFoundException("no post found with this id "+postId));
        postRepository.deleteById(postId);
    }

    @Override
    public Post updatePost(Post post) {
        validatePost(post);
        Post existingPost=findPostById(post.getPostId());
        existingPost.setTitle(post.getTitle());
        existingPost.setContent(post.getContent());
        existingPost.setFeaturedImage(post.getFeaturedImage());
        existingPost.setCategoryId(post.getCategoryId());
        return postRepository.save(existingPost);
    }

    @Override
    public List<Post> getAllPost(int pageNumber, int pageSize) {
        Pageable p= PageRequest.of(pageNumber,pageSize, Sort.by("postDate").ascending());
        Page<Post> posts=postRepository.findAll(p);
        List<Post> getPost=posts.getContent();
        return getPost;
    }


}
