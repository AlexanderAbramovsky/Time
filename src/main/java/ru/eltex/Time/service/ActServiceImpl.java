package ru.eltex.Time.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.repository.ActRepository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Optional;

/** Класс Service реализующий интерфейс ActService,
 *  реализует методы для работы с таблицей acts
 *  бызы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@Service
public class ActServiceImpl implements ActService{

    /** Объект репозитория для управления таблицей acts */
    private ActRepository repository;

    /**
     * Инициализация объекта репозитория
     * @param repository - объект репозитория
     */
    @Autowired
    public void setActRepository(ActRepository repository) {
        this.repository = repository;
    }


    @Override
    public Iterable<Act> getActByDate(String date_act) {
        return repository.findOneByDateAct(date_act);
    }

    /**
     * Возвращает все уникальные даты создания актов из таблицы acts
     * отрезаем время от даты т.к. в таблице используется тип данных DateTime
     * @return - возвращает даты
     */
    @Override
    public Iterable<String> findAllDistinctDate() {
        return repository.findAllDistinctDate();
    }

    /**
     * Сохраняет в базу данных объект Act
     * @param act - объект класса Act
     * @return - возвращает сохранённый объект Act
     */
    @Override
    public Optional<Act> saveAct(Act act) {
        repository.save(act);
        return Optional.of(act);
    }

    /**
     * Возвращает все объекты Act из таблицы
     * @return - возвращает объекты Act
     */
    @Override
    public Iterable<Act> findAllAct() {
        return repository.findAll();
    }
}
