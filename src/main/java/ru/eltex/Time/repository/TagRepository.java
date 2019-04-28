package ru.eltex.Time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.eltex.Time.entity.Tag;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findOneByTag(String tag);
}
