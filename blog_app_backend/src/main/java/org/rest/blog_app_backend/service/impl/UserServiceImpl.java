package org.rest.blog_app_backend.service.impl;

import org.rest.blog_app_backend.entity.User;
import org.rest.blog_app_backend.exception.UserNotFoundException;
import org.rest.blog_app_backend.repository.UserRepository;
import org.rest.blog_app_backend.security.JwtHelper;
import org.rest.blog_app_backend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final JwtHelper jwtHelper;

    public UserServiceImpl(UserRepository userRepository, JwtHelper jwtHelper) {
        this.userRepository = userRepository;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public User findByUserId(String userId) {
        User user=userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("no user found with this id"));
        return user;
    }

    @Override
    public User findUserByEmail(String email) {
        User user=userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User findUserByToken(String token) {
        String jwtToken = token.substring(7);
        final String username=jwtHelper.getUserNameFromToken(jwtToken);
        User user=userRepository.findByEmail(username);
        return user;
    }

}
