package com.indica.med.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.tomcat.util.net.Acceptor;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Data
@AllArgsConstructor
@Builder
public class ApiResponseDto<T> {
    private String status;
    private String message;
    private T response;
}
