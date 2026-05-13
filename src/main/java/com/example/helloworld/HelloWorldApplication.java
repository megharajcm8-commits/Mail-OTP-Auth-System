package com.example.helloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import com.example.helloworld.model.User;
import com.example.helloworld.repository.UserRepository;

@SpringBootApplication
public class HelloWorldApplication {

    public static void main(String[] args) {
        SpringApplication.run(HelloWorldApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository repo) {
        return args -> {
            User u = new User();
            u.setUsername("admin");
            u.setPassword("123");
            repo.save(u);
        };
    }
}