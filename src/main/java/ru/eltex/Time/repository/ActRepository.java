package ru.eltex.Time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.eltex.Time.entity.Act;

/** Интерфейс репозитория хранящий все методы для работы
 *  с таблицей acts быза данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
public interface ActRepository extends JpaRepository<Act, Integer> {

}
