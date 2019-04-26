package ru.eltex.Time.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
    @GetMapping("/time")
    public String greeting(Model model) {
        return "time";
    }
}
