package ru.eltex.Time.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** Контроллер возвращающий страницу авторизации
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    /**
     * Возвращает страницу авторизации
     * @param registry - возвращает страницу login.html
     */
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
    }
}
