package com.indica.med.controller;

import com.indica.med.dto.UserDto;
import com.indica.med.dto.auth.AuthenticationRequest;
import com.indica.med.dto.auth.AuthenticationResponse;
import com.indica.med.dto.auth.BusinessUserSUR;
import com.indica.med.dto.auth.CustomerSUR;
import com.indica.med.dto.auth.SignUpRequest;
import com.indica.med.model.User;
import com.indica.med.repository.UserRepository;
import com.indica.med.service.auth.AuthService;
import com.indica.med.service.user.UserService;
import com.indica.med.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;
    private final UserRepository userRepository;
    public final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;


    @PostMapping("/signup/customer")
    public ResponseEntity<?> signupCustomer(@RequestBody CustomerSUR signUpRequest) {

        if (authService.hasUserWithEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exist with this email");
        }

        UserDto createdUserDto = authService.signUpCustomer(signUpRequest);
        if (createdUserDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not created");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserDto);
    }
    
    @PostMapping("/signup/business")
    public ResponseEntity<?> signupBusinessUser(@RequestBody BusinessUserSUR signUpRequest){
        if (authService.hasUserWithEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exist with this email");
        }

        UserDto createdUserDto = authService.signUpBusinessUser(signUpRequest);
        if (createdUserDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not created");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserDto);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));

        } catch (BadCredentialsException e) {
            AuthenticationResponse badResponse = new AuthenticationResponse();
            badResponse.setJwt(null);
            badResponse.setUserId(null);
            badResponse.setUserRole(null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(badResponse);
        }

        final UserDetails userDetails = userService.userDetailService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(authenticationRequest.getEmail());
        User user = optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        final String jwtToken = jwtUtil.generateToken(userDetails);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setJwt(jwtToken);
        authenticationResponse.setUserId(user.getId());
        authenticationResponse.setUserRole(String.valueOf(user.getUserRole()));
        return ResponseEntity.ok(authenticationResponse);
    }

}