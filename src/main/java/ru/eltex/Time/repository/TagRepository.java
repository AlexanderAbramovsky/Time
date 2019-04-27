package ru.eltex.Time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.eltex.Time.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Iterable<Tag> findByTag(String tag);
}
