package ru.eltex.Time.service;

import ru.eltex.Time.entity.Act;

import java.util.Optional;

/** Интерфейс сервиса реализующий методы
 *  нужные пользователю для работы с таблицей acts
 *  базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
public interface ActService {
    /*Optional<Act> getTagByTagText(String tag);
    Optional<Act> getTagById(Integer id);
    Optional<Act> saveTag(Act tag);
    void updateTag(Integer id, String tag);
    void deleteAct(Integer id);*/
    Iterable<Act> findAllAct();
}
