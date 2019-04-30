package ru.eltex.Time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.eltex.Time.entity.Act;

import java.sql.Date;

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
    Iterable<Date> findAllDistinctDate();
}
