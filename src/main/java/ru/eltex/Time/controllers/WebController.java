package ru.eltex.Time.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

/** Контроллер возвращающий страницу html
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@Controller
public class WebController {

    /**
     * Возвращает основную страницу с контентом
     * @param model - запрашивает подель
     * @return - возвращает страницу time.html
     */
    @GetMapping("/time")
    public String greeting(Model model) {
        return "time";
    }
}
