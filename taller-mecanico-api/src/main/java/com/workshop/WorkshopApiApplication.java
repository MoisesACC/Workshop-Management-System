package com.workshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WorkshopApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(WorkshopApiApplication.class, args);
    }
}