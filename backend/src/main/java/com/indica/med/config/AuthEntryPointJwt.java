package com.indica.med.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Component được chương trình chạy đến
 * khi có bất kì Exception về xác thực và phân quyền
 */
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    private final static Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        logger.error("Unauthorized error : {}", authException.getMessage());

        // Loại dữ liệu trả về là JSON
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        // Trạng thía trả về là UNAUTHORIZED
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        //Đối tượng trả về cho luồng đầu ra, bao gồm các trường được put
        final Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized");
        body.put("message", authException.getMessage());
        body.put("path", request.getServletPath());

        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), body);
    }
}
