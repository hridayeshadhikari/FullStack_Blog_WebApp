package org.rest.blog_app_backend.controller;

import org.rest.blog_app_backend.entity.Comment;
import org.rest.blog_app_backend.entity.Post;
import org.rest.blog_app_backend.entity.User;
import org.rest.blog_app_backend.service.PostService;
import org.rest.blog_app_backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService){
        this.postService=postService;
        this.userService = userService;
    }

    @PostMapping("/api/post/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post,@RequestHeader("Authorization") String jwt){
        Post createdPost= postService.createPost(post,jwt);
        return new ResponseEntity<>(createdPost,HttpStatus.CREATED);
    }

    @GetMapping("/post/{postId}")
    public Post getPostById(@PathVariable String postId){
        return postService.findPostById(postId);
    }

    @PostMapping("/api/post/like/{postId}")
    public Post likePost(@PathVariable String postId,
                         @RequestHeader("Authorization") String jwt){
        User user=userService.findUserByToken(jwt);
        Post post=postService.likePost(postId, user.getId());
        return post;
    }

    @PostMapping("/api/post/dislike/{postId}")
    public Post dislikePost(@PathVariable String postId,
                         @RequestHeader ("Authorization")String jwt){
        User user=userService.findUserByToken(jwt);
        Post post=postService.disLikePost(postId, user.getId());
        return post;
    }

    @PostMapping("/api/post/comment/{postId}")
    public Post createComment(@PathVariable String postId, @RequestHeader("Authorization")String jwt,
                              @RequestBody Comment comment){
        Post post=postService.commentPost(postId,jwt,comment);
        return post;
    }

    @DeleteMapping("/api/post/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId ,
                                             @RequestHeader("Authorization")String jwt){

        User user=userService.findUserByToken(jwt);
        Post post=postService.findPostById(postId);
//        System.out.println("user ====>"+post.getAuthor().getId().equals(user.getId()));
//        System.out.println("userid====>"+user.getId());
//        System.out.println("authorid====>"+post.getAuthor().getId());
        if(!post.getAuthor().getId().equals(user.getId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        postService.deletePost(postId);
        return new ResponseEntity<>("deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/api/post/update")
    public ResponseEntity<Post> updatePost(@RequestBody Post post,@RequestHeader("Authorization")String jwt){
        User user=userService.findUserByToken(jwt);

        if(post.getAuthor().getId()!=user.getId()){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        Post updatedPost=postService.updatePost(post);
        return new ResponseEntity<>(updatedPost,HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<Page<Post>> getPostByPage(@RequestParam(defaultValue = "1") int page,
                                                    @RequestParam(defaultValue = "4") int sizePerPage){

        Page<Post> getPostByPage=postService.getAllPost(page,sizePerPage);


        return new ResponseEntity<>(getPostByPage,HttpStatus.OK);

    }

    @GetMapping("/post/search")
    public ResponseEntity<Page<Post>> getPostBySearch(@RequestParam String title,@RequestParam(defaultValue = "1") int pageNumber,
                                                      @RequestParam(defaultValue = "4") int pageSize){
        Page<Post> getPostBySearch=postService.getPostBySearch(title,pageNumber,pageSize);
        return new ResponseEntity<>(getPostBySearch,HttpStatus.OK);
    }

}
