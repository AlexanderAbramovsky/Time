package ru.eltex.Time.controllers;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.eltex.Time.entity.Tag;
import ru.eltex.Time.service.TagService;

import java.util.Optional;


/** REST контроллер управления таблицей tags базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@RestController
public class TagController {

    final static Logger LOGGER = Logger.getLogger(TagController.class);

    /** Объект сервиса для управления таблицей */
    private TagService service;

    /**
     * Инициализация сервиса
     * @param service - объект сервиса
     */
    @Autowired
    public void setTagService(TagService service) {
        LOGGER.info("создание сервиса управления таблицей tags");
        this.service = service;
    }

    /**
     * Возвращает Tag по id запроса страницы
     * @param id - id запрашиваемого Tag
     * @return - возвращает json запрашиваемого объекта Tag
     */
    @PostMapping(path="/get_tag")
    public Optional<Tag> getTag(@RequestParam int id) {
        LOGGER.info("Возвращает Tag по id запроса страницы из таблицы tags");
        return service.getTagById(id);
    }

    /**
     * Сохраняет объект Tag
     * и возвращает его, для получения id
     * @param tag - передаваймый текст для создания объекта Tag
     * @return - возвращает json созданного объекта Tag
     */
    @PostMapping(path="/save_tag")
    public Optional<Tag> saveTag(@RequestParam String tag) {
        LOGGER.info("Сохраняет объект Tag в таблицу tags");
        Tag tagSave = new Tag(null, tag);
        return service.saveTag(tagSave);
    }

    /**
     * Обновляет запрашиваемый объект Tag в базе данных
     * @param id - id запрашиваемого объекта
     * @param tag - новый текст Tag
     */
    @PostMapping(path="/update_tag")
    public void updateTag(@RequestParam Integer id, @RequestParam String tag) {
        LOGGER.info("Обновляет запрашиваемый объект Tag из таблицы tags");
        service.updateTag(id, tag);
    }

    /**
     * Удаляет запрашиваемый объект Tag из базы данных
     * @param id - id запрашиваемого объекта
     */
    @PostMapping(path="/delete_tag")
    public void deleteTag(@RequestParam int id) {
        LOGGER.info("Удаляет запрашиваемый объект Tag из таблицы tags");
        service.deleteTag(id);
    }

    /**
     * Возвращает все объекты типа Tag из базы данных
     * @return - возвращает json всех объектов типа Tag из базы даннх
     */
    @PostMapping(path="/all_tags")
    public Iterable<Tag> getAllTags() {
        LOGGER.info("Возвращает все объекты типа Tag из таблицы tags");
        return service.findAllTags();
    }

    /**
     * Возвращает объект Tag по запрашиваему тексту тега
     * @param tag - текст по которому будет происходить поиск
     * @return - возвращает json найденного объекта
     */
    @PostMapping(path="/get_tag_findTextTag")
    public Optional<Tag> getTags(@RequestParam String tag) {
        LOGGER.info("Возвращает объект Tag по запрашиваему тексту тега из таблицы tags");
        return service.getTagByTagText(tag);
    }
}
