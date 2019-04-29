package ru.eltex.Time.service;

import ru.eltex.Time.entity.Tag;

import java.util.Optional;

/** Интерфейс сервиса реализующий методы
 *  нужные пользователю для работы с таблицей tags
 *  базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
public interface TagService {
    Optional<Tag> getTagByTagText(String tag);
    Optional<Tag> getTagById(Integer id);
    Optional<Tag> saveTag(Tag tag);
    void updateTag(Integer id, String tag);
    void deleteTag(Integer id);
    Iterable<Tag> findAllTags();
}
