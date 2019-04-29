package ru.eltex.Time.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eltex.Time.entity.Tag;
import ru.eltex.Time.repository.TagRepository;

import java.util.Optional;

/** Класс Service реализующий интерфейс TagService,
 *  реализует методы для работы с таблицей tags
 *  бызы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@Service
public class TagServiceImpl implements TagService {

    /** Объект репозитория для управления таблицей tags */
    private TagRepository repository;

    /**
     * Инициализация объекта репозитория
     * @param repository - объект репозитория
     */
    @Autowired
    public void setActRepository(TagRepository repository) {
        this.repository = repository;
    }

    /**
     * Возвращает объект Tag по тексту тега
     * @param tag - текст искомого тега
     * @return - возвращает json найденного Tag
     */
    @Override
    public Optional<Tag> getTagByTagText(String tag) {
        return repository.findOneByTag(tag);
    }

    /**
     * Возвращает объект Tag по id
     * @param id - id искомого тега
     * @return - возвращает json найденного Tag
     */
    @Override
    public Optional<Tag> getTagById(Integer id) {
        return repository.findById(id);
    }

    /**
     * Сохраняет объект Tag
     * @param tag - сохраняемый объект Tag
     * @return - возвращает сохранённый объекта Tag
     */
    @Override
    public Optional<Tag> saveTag(Tag tag) {
        repository.save(tag);
        return repository.findOneByTag(tag.getTag());
    }

    /**
     * Обновляет Tag в таблице
     * @param id - id тега которого нужно обновить
     * @param tag - новый текст тега
     */
    @Override
    public void updateTag(Integer id, String tag) {
        Optional<Tag> updated = repository.findById(id);
        updated.get().setId(id);
        updated.get().setTag(tag);
        repository.save(updated.get());
    }

    /**
     * Удаляет Tag из таблицы
     * @param id - id удаляемого тега
     */
    @Override
    public void deleteTag(Integer id) {
        repository.deleteById(id);
    }

    /**
     * Возвращает все объекты Tag из таблицы
     * @return - возвращает объекты Tag
     */
    @Override
    public Iterable<Tag> findAllTags() {
        return repository.findAll();
    }
}
