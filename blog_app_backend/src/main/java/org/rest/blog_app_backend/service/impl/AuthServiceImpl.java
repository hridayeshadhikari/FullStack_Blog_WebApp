package org.rest.blog_app_backend.service.impl;

import org.rest.blog_app_backend.entity.User;
import org.rest.blog_app_backend.exception.UserAlreadyExist;
import org.rest.blog_app_backend.repository.UserRepository;
import org.rest.blog_app_backend.request.RegisterRequest;
import org.rest.blog_app_backend.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;
    public AuthServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }
    @Override
    public User registerUser(RegisterRequest request) {
        User existingUser=userRepository.findByEmail(request.getEmail());
        if(existingUser!=null){
            throw new UserAlreadyExist("user already exist");
        }
        User newUser=new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setJoined(LocalDateTime.now());

        return userRepository.save(newUser);
    }
}
