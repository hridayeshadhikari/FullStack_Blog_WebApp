package org.rest.blog_app_backend.repository;

import org.rest.blog_app_backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post,String> {

    @Override
    Page<Post> findAll(Pageable pageable);
}
