package org.rest.blog_app_backend.repository;

import org.rest.blog_app_backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface PostRepository extends MongoRepository<Post,String> {
    Page<Post> findByTitleContainingIgnoreCase(String title,Pageable pageable);

    List<Post> findTop10ByOrderByPostDateDesc();

    List<Post> findTop10ByOrderByLikedDesc();

    //MongoDB Aggregation Pipeline
    @Aggregation(pipeline = {
            "{'$sample': {'size': 10}}"
    })
    List<Post> findRandomPost();

    Page<Post> findByCategoryContainingIgnoreCase(String category,Pageable pageable);

}
