package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignalingMessage {
    private String type;    // offer / answer / candidate
    private String sender;
    private String target;
    private String data;

}
