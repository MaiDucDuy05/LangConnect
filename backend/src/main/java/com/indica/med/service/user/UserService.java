package com.indica.med.service.user;

import com.indica.med.dto.BusinessUserDto;
import com.indica.med.dto.UserDto;
import com.indica.med.enums.BusinessType;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailService();

    UserDto getCustomerById(Long id);

    UserDto updateCustomerById(Long id, UserDto user);

    List<UserDto> getAllCustomers();

    List<BusinessUserDto> getAllBusiness(BusinessType businessType);

    BusinessUserDto getBusinessById(Long id);

}

