package com.indica.med.exception;

import com.indica.med.dto.ApiResponseDto;
import com.indica.med.enums.ResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDto<?>> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception) {
        List<String> errorMessage = new ArrayList<>();

        exception.getBindingResult().getFieldErrors().forEach(fieldError -> {
            errorMessage.add(fieldError.getDefaultMessage());
        });

        return ResponseEntity
                .badRequest()
                .body(
                        ApiResponseDto.builder()
                                .status(String.valueOf(ResponseStatus.FAIL))
                                .message("Lỗi đăng kí : dữ liệu không hợp lệ")
                                .response(errorMessage)
                                .build()
                );
    }

    @ExceptionHandler(value = UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponseDto<?>> UserAlreadyExistsExceptionHandler(UserAlreadyExistsException exception) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        ApiResponseDto.builder()
                                .status(String.valueOf(ResponseStatus.FAIL))
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(value = RoleNotFoundException.class)
    public ResponseEntity<ApiResponseDto<?>> RoleNotFoundExceptionHandler(RoleNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_GATEWAY)
                .body(
                        ApiResponseDto.builder()
                                .status(String.valueOf(ResponseStatus.FAIL))
                                .message(exception.getMessage())
                                .build()
                );
    }
}

