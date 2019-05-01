package ru.eltex.Time.service;

import ru.eltex.Time.entity.Act;

import java.sql.Date;
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
    void updateTag(Integer id, String tag);
    void deleteAct(Integer id);*/

    String getAllTimeDate(String date_act);
    Iterable<Act> getActByDate(String date_act);
    Iterable<String> findAllDistinctDate();
    Optional<Act> saveAct(Act tag);
    Iterable<Act> findAllAct();
}
