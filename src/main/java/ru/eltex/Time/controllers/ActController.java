package ru.eltex.Time.controllers;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.service.ActService;

import java.util.Optional;

/** REST контроллер управления таблицей acts базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.3.0
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
     * Удаляет запрашиваемый объект Act из базы данных
     * @param id - id запрашиваемого объекта
     */
    @CrossOrigin
    @PostMapping(path="/delete_act")
    public void deleteAct(@RequestParam int id) {
        LOGGER.info("Удаляет объект Act из таблицы acts id-" + id);
        service.deleteAct(id);
    }

    /**
     * Возвращает общее время актов по переданной дате
     * @param date_act - дата
     * @return - общее время выполнее актов
     */
    @CrossOrigin
    @PostMapping(path="/get_all_time_date")
    public String getAllTimeDate(String date_act) {
        LOGGER.info("общее время всех актов даты-" + date_act);
        return service.getAllTimeDate(date_act);
    }

    /**
     * Возвращает все уникальные даты создания актов из таблицы acts
     * @return - возвращает даты
     */
    @CrossOrigin
    @PostMapping(path="/get_distinct_date")
    public Iterable<String> getActsDate() {
        LOGGER.info("Возвращает все уникальные даты создания актов из таблицы acts");
        return service.findAllDistinctDate();
    }

    /**
     * Обновляет текст акта по его id
     * @param id - id обновляемого акта
     * @param act - новый текст акта
     */
    @PostMapping(path="/update_act")
    public void updateTag(@RequestParam Integer id, @RequestParam String act) {
        LOGGER.info("Обновляет запрашиваемый объект Act из таблицы tags id-" + id);
        service.updateAct(id, act);
    }

    /**
     * Добавляет тег в акт
     * @param id - id акта
     * @param tag - добавляемый тег
     */
    @PostMapping(path="/add_tag_act")
    public void addTagAct(@RequestParam Integer id, @RequestParam String tag) {
        LOGGER.info("Добавляет тег-" + tag + " в акт id-" + id);
        service.addTagAct(id, tag);
    }

    /**
     * Удаляет тег из акта
     * @param id - id акта
     * @param tag - удаляемый тег
     */
    @PostMapping(path="/delete_tag_act")
    public void deleteTagAct(@RequestParam Integer id, @RequestParam String tag) {
        LOGGER.info("Удаляет тег-" + tag + " из акта id-" + id);
        service.deleteTagAct(id, tag);
    }

    /**
     * Удаляет тег из всех актов
     * @param tag - удаляемый тег
     */
    @PostMapping(path="/delete_tag_all_act")
    public void deleteAllTagAct(@RequestParam String tag) {
        LOGGER.info("Удаляет из всех актов тег - " + tag);
        service.deleteAllTagAct(tag);
    }

    /**
     * Возвращает акт по его id
     * @param id - id акта
     * @return - акт
     */
    @PostMapping(path="/get_act_findById")
    public Optional<Act> getActById(@RequestParam Integer id) {
        LOGGER.info("Возвращает акт по его id-" + id);
        return service.getActById(id);
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

    /**
     * Возвращает объекты Act по запрашиваемой дате создания акта из таблицы acts
     * @param date_act - дата по которой будет проходить выборка
     * @return - возвращает все акты по заданной дате
     */
    @PostMapping(path="/get_acts_findDateAct")
        public Iterable<Act> getActsFindDateAct(@RequestParam String date_act) {
        LOGGER.info("Возвращает объекты Act по запрашиваемой дате создания акта из таблицы acts date-" + date_act);
        return service.getActByDate(date_act);
    }
}
