package ru.eltex.Time.controllers;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.service.ActService;

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


    @PostMapping(path="/get_all_time_date")
    public String getAllTimeDate(String date_act) {
      //  LOGGER.info("Возвращает все уникальные даты создания актов из таблицы acts");
        return service.getAllTimeDate(date_act);
    }

    /**
     * Возвращает все уникальные даты создания актов из таблицы acts
     * @return - возвращает даты
     */
    @PostMapping(path="/get_distinct_date")
    public Iterable<String> getActsDate() {
        LOGGER.info("Возвращает все уникальные даты создания актов из таблицы acts");
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
                                 @RequestParam String date_act,
                                 @RequestParam String time_start_act,
                                 @RequestParam String time_end_act,
                                 @RequestParam String all_time_act) {
        LOGGER.info("Сохраняет объект Act в таблицу acts");

        Act tagSave = new Act(null, act, project,tag, date_act, time_start_act, time_end_act, all_time_act);
        return service.saveAct(tagSave);
    }

    /**
     * Возвращает все объекты типа Act из базы данных
     * @return - возвращает json всех объектов типа Act из базы даннх
     */
    @PostMapping(path="/all_acts")
    public Iterable<Act> getAllActs() {
        LOGGER.info("Возвращает все объекты типа Act из таблицы acts");
        return service.findAllAct();
    }


    @PostMapping(path="/get_acts_findDateAct")
    public Iterable<Act> getActsFindDateAct(@RequestParam String date_act) {
        LOGGER.info("Возвращает объекты Act по запрашиваемой дате создания акта из таблицы acts");
        return service.getActByDate(date_act);
    }

}
