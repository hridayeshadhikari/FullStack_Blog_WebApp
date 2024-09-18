package org.rest.blog_app_backend.service;

import org.rest.blog_app_backend.entity.User;
import org.rest.blog_app_backend.request.RegisterRequest;

public interface AuthService {
    User registerUser(RegisterRequest request);
}
