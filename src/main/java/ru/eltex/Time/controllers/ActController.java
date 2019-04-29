package ru.eltex.Time.controllers;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.service.ActService;

import java.util.Optional;

@RestController
public class ActController {

    final static Logger LOGGER = Logger.getLogger(ActController.class);

    private ActService service;

    @Autowired
    public void setTagService(ActService service) {
        LOGGER.info("создание сервиса управления таблецей tags");
        this.service = service;
    }

    @GetMapping(path="/all_acts")
    public Iterable<Act> getAllActs() {
        LOGGER.info("Возвращает все объекты типа Act из базы данных");
        return service.findAllAct();
    }

}
