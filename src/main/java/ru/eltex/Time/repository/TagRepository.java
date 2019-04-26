package ru.eltex.Time.repository;

import org.springframework.data.repository.CrudRepository;
import ru.eltex.Time.entity.Tag;

public interface TagRepository extends CrudRepository<Tag, Integer> {
}
