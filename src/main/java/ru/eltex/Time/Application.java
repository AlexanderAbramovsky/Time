package ru.eltex.Time;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** Класс запускающий сервер
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@SpringBootApplication
public class Application {

    final static Logger LOGGER = Logger.getLogger(Application.class);

    /**
     * Старт сервера
     * @param args - начальные параметры
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

        LOGGER.info("Запуск сервера");
    }
}
