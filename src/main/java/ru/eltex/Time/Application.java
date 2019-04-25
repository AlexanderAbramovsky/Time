package ru.eltex.Time;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static final String NAME = "users";

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
