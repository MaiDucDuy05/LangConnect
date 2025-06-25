package com.indica.med.service.auth;


import com.indica.med.dto.UserDto;
import com.indica.med.dto.auth.BusinessUserSUR;
import com.indica.med.dto.auth.CustomerSUR;
import org.springframework.stereotype.Service;

public interface AuthService {
    UserDto signUpCustomer(CustomerSUR signUpRequest);
    UserDto signUpBusinessUser(BusinessUserSUR signUpRequest);
    boolean hasUserWithEmail(String email);
}

