package ru.eltex.Time.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.repository.ActRepository;

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

    /**
     * Возвращает все объекты Act из таблицы
     * @return - возвращает объекты Act
     */
    @Override
    public Iterable<Act> findAllAct() {
        return repository.findAll();
    }
}
