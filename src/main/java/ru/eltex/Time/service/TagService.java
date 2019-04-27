package ru.eltex.Time.service;

import ru.eltex.Time.entity.Tag;

import java.util.Optional;

public interface TagService {
    Iterable<Tag> getTagByTagText(String tag);
    Optional<Tag> getTagById(Integer id);
    void saveTag(Tag tag);
    void updateTag(Integer id, String tag);
    void deleteTag(Integer id);
    Iterable<Tag> findAll();
}
