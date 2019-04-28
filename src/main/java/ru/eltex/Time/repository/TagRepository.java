package ru.eltex.Time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.eltex.Time.entity.Tag;

import java.util.Optional;

/** Интерфейс репозитория хранящий все методы для работы
 *  с таблицей tags быза данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findOneByTag(String tag);
}
