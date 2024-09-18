package org.rest.blog_app_backend.service;


import org.rest.blog_app_backend.entity.User;

public interface UserService {
    User findByUserId(String userId);

    User findUserByEmail(String email);
    User findUserByToken(String token);
}
