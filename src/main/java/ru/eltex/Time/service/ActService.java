package ru.eltex.Time.service;

import ru.eltex.Time.entity.Act;

import java.sql.Date;
import java.util.Optional;

/** Интерфейс сервиса реализующий методы
 *  нужные пользователю для работы с таблицей acts
 *  базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.3.0
 */
public interface ActService {

    void deleteAllTagAct(String tag);
    void deleteTagAct(Integer id, String tag);
    void addTagAct(Integer id, String tag);
    void deleteAct(Integer id);
    Optional<Act> getActById(Integer id);
    void updateAct(Integer id, String act);
    String getAllTimeDate(String date_act);
    Iterable<Act> getActByDate(String date_act);
    Iterable<String> findAllDistinctDate();
    Optional<Act> saveAct(Act tag);
    Iterable<Act> findAllAct();
}
