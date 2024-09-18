package org.rest.blog_app_backend.exception;

public class IncorrectPasswordException extends RuntimeException{

    public IncorrectPasswordException(String message){
        super(message);
    }

}
