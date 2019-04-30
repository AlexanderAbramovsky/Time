package ru.eltex.Time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.eltex.Time.entity.Act;

import java.sql.Date;
import java.util.ArrayList;

/** Интерфейс репозитория хранящий все методы для работы
 *  с таблицей acts быза данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
public interface ActRepository extends JpaRepository<Act, Integer> {
    /**
     * Возвращает все уникальные даты создания актов из таблицы acts
     * @return - возвращает даты
     */
    @Query(value = "select DISTINCT date_act from acts ORDER BY date_act DESC" , nativeQuery = true)
    Iterable<String> findAllDistinctDate();


    @Query(value = "select * from acts where date_act like %:date_act%" , nativeQuery = true)
    Iterable<Act> findOneByDateAct(@Param("date_act") String date_act);
}
