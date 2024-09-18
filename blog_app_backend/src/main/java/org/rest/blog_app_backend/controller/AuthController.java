package org.rest.blog_app_backend.controller;


import lombok.extern.slf4j.Slf4j;
import org.rest.blog_app_backend.entity.User;
import org.rest.blog_app_backend.exception.IncorrectPasswordException;
import org.rest.blog_app_backend.exception.UserNotFoundException;
import org.rest.blog_app_backend.repository.UserRepository;
import org.rest.blog_app_backend.request.LoginRequest;
import org.rest.blog_app_backend.request.RegisterRequest;
import org.rest.blog_app_backend.response.AuthResponse;
import org.rest.blog_app_backend.security.CustomUserDetailService;
import org.rest.blog_app_backend.security.JwtHelper;
import org.rest.blog_app_backend.service.AuthService;
import org.rest.blog_app_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    private final UserRepository userRepository;
    private final JwtHelper jwtHelper;
    private final UserService userService;
    private final AuthService authService;
    private CustomUserDetailService customUserDetailService;
    private PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, JwtHelper jwtHelper, UserService userService, AuthService authService, CustomUserDetailService customUserDetailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtHelper = jwtHelper;
        this.userService = userService;
        this.authService = authService;
        this.customUserDetailService = customUserDetailService;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request){
        User user=authService.registerUser(request);
        return new ResponseEntity<>("Register success", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest request){
        Authentication authentication=authenticate(request.getEmail(),request.getPassword());
        String token= jwtHelper.generateToken(authentication);
        AuthResponse res=new AuthResponse(token,"Login Successful ");
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails=customUserDetailService.loadUserByUsername(email);
        if (userDetails==null){
            throw new BadCredentialsException("no user found with this username");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Incorrect Password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }

//    @GetMapping("/user")
//    public void getUserFromToken(@RequestHeader("Authorization") String jwt){
//        User user=userService.findUserByToken(jwt);
//        System.out.println("====>"+user);
//
//    }

}
