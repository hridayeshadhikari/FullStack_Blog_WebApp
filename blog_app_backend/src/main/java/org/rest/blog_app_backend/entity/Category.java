package org.rest.blog_app_backend.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "category")
public class Category {
    private int id;
    private String categoryName;
    private List<Integer> postId;
}
