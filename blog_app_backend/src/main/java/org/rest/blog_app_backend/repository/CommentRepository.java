package org.rest.blog_app_backend.repository;

import org.rest.blog_app_backend.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment,String> {
}
