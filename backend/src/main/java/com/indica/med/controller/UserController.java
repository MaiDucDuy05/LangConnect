package com.indica.med.controller;

import com.indica.med.dto.BusinessUserDto;
import com.indica.med.dto.ReactionDto;
import com.indica.med.dto.UserDto;
import com.indica.med.enums.BusinessType;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.User;
import com.indica.med.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/customer/{id}")
    public ResponseEntity<UserDto> getCustomerById(@PathVariable Long id) {
        UserDto userDto = userService.getCustomerById(id);
        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/customers")
    public ResponseEntity<List<UserDto>> getAllCustomers() {
        List<UserDto> customers = userService.getAllCustomers();
        if (customers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/business")
    public ResponseEntity<List<BusinessUserDto>> getAllBusiness(@RequestParam BusinessType businessType) {
        List<BusinessUserDto> business = userService.getAllBusiness(businessType);
        if (business.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(business);
    }

    @GetMapping("/business/{id}")
    public ResponseEntity<BusinessUserDto> getBusinessById(@PathVariable Long id) {
        BusinessUserDto business = userService.getBusinessById(id);
        if (business == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(business);
    }



    @PatchMapping("/customer/{id}")
    public ResponseEntity<UserDto> updateCustomerById(@PathVariable Long id, @RequestBody UserDto dto) {
        UserDto updatedUser = userService.updateCustomerById(id, dto);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }



}
