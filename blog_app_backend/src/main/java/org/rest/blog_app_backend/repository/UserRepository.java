package org.rest.blog_app_backend.repository;

import org.rest.blog_app_backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {

    User findByEmail(String email);
}
