package com.indica.med.exception;

public class UserAlreadyExistsException extends RuntimeException{
    UserAlreadyExistsException(String message) {
        super(message);
    }
}
