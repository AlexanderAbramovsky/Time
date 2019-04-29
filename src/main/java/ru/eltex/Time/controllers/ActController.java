package ru.eltex.Time.controllers;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.service.ActService;

/** REST контроллер управления таблицей acts базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@RestController
public class ActController {

    final static Logger LOGGER = Logger.getLogger(ActController.class);

    /** Объект сервиса для управления таблицей */
    private ActService service;

    /**
     * Инициализация сервиса
     * @param service - объект сервиса
     */
    @Autowired
    public void setTagService(ActService service) {
        LOGGER.info("создание сервиса управления таблецей acts");
        this.service = service;
    }

    /**
     * Возвращает все объекты типа Act из базы данных
     * @return - возвращает json всех объектов типа Act из базы даннх
     */
    @GetMapping(path="/all_acts")
    public Iterable<Act> getAllActs() {
        LOGGER.info("Возвращает все объекты типа Act из базы данных");
        return service.findAllAct();
    }

}
