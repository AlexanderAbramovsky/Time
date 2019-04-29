package ru.eltex.Time.service;

import ru.eltex.Time.entity.Act;

import java.util.Optional;

public interface ActService {
    /*Optional<Act> getTagByTagText(String tag);
    Optional<Act> getTagById(Integer id);
    Optional<Act> saveTag(Act tag);
    void updateTag(Integer id, String tag);
    void deleteAct(Integer id);*/
    Iterable<Act> findAllAct();
}
