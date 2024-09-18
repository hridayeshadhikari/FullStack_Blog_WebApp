package org.rest.blog_app_backend.exception;

public class HandlePostNotFoundException extends RuntimeException{
    public HandlePostNotFoundException(String message){
        super(message);
    }
}
