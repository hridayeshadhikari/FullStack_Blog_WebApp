package org.rest.blog_app_backend.controller;

import org.rest.blog_app_backend.entity.User;
import org.rest.blog_app_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/user/profile")
    public ResponseEntity<User> getUserFromToken(@RequestHeader ("Authorization")String jwt){
        User user=userService.findUserByToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
