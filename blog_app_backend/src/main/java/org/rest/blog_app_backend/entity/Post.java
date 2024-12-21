package org.rest.blog_app_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor 
@NoArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String postId;
    private String title;
    private String content;
    private String featuredImage;
    private List<User> liked=new ArrayList<>();
    private List<User> disliked=new ArrayList<>();
    private List<Comment> comments=new ArrayList<>();
    private String category;
    private LocalDateTime postDate;
    private User author;
}
