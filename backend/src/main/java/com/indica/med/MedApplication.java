package com.indica.med;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.ConfigurableEnvironment;


@SpringBootApplication
public class MedApplication {
    public static void main(String[] args) {
        SpringApplication.run(MedApplication.class, args);
    }
}