package ru.eltex.Time.controllers;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.service.ActService;

import java.sql.Date;
import java.sql.Time;
import java.util.Optional;

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
     * Возвращает все уникальные даты создания актов из таблицы acts
     * @return - возвращает даты
     */
    @PostMapping(path="/get_distinct_date")
    public Iterable<Date> getActsDate() {
        LOGGER.info("Возвращает Tag по id запроса страницы");
        return service.findAllDistinctDate();
    }

    /**
     * Сохраняет объект Act
     * и возвращает его, для получения id
     * @param act - текст акта
     * @param project - текст проекта, к которому относится акт
     * @param tag - текст тега, к которому относится акт
     * @param date_act - дата создания акта
     * @param time_start_act - время создания акта
     * @param time_end_act - время окончания акта
     * @param all_time_act - общее время выполнения акта
     * @return - возвращает сохранёный объект Act
     */
    @PostMapping(path="/save_act")
    public Optional<Act> saveAct(@RequestParam String act,
                                 @RequestParam String project,
                                 @RequestParam String tag,
                                 @RequestParam Date date_act,
                                 @RequestParam Time time_start_act,
                                 @RequestParam Time time_end_act,
                                 @RequestParam Time all_time_act) {
        LOGGER.info("Сохраняет объект Act");

        Act tagSave = new Act(null, act, project,tag, date_act, time_start_act, time_end_act, all_time_act);
        return service.saveAct(tagSave);
    }

    /**
     * Возвращает все объекты типа Act из базы данных
     * @return - возвращает json всех объектов типа Act из базы даннх
     */
    @PostMapping(path="/all_acts")
    public Iterable<Act> getAllActs() {
        LOGGER.info("Возвращает все объекты типа Act из базы данных");
        return service.findAllAct();
    }

}
