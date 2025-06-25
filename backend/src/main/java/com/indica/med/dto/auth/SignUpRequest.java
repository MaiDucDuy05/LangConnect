package com.indica.med.dto.auth;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SignUpRequest {
    private String name;
    private String email;
    private String password;
    private String phoneNumber; // User's phone number
    private String address; // User's address
    private String profilePic; // URL or path to the user's profile picture
}
