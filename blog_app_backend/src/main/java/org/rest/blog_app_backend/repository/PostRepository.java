package org.rest.blog_app_backend.repository;

import org.rest.blog_app_backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post,String> {
    Page<Post> findByTitleContainingIgnoreCase(String title,Pageable pageable);
}
