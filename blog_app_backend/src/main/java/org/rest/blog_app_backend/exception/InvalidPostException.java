package org.rest.blog_app_backend.exception;

public class InvalidPostException extends RuntimeException{
    public InvalidPostException(String message){
        super(message);
    }
}
