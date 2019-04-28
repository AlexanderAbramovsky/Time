package ru.eltex.Time.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.eltex.Time.entity.Tag;
import ru.eltex.Time.service.TagService;

import java.util.Optional;

@RestController
public class TagController {

    private TagService service;

    @Autowired
    public void setNoteService(TagService service) {
        this.service = service;
    }

    @PostMapping(path="/get_tag")
    public Optional<Tag> getTag(@RequestParam int id) {
        return service.getTagById(id);
    }

    @PostMapping(path="/save_tag")
    public Optional<Tag> saveTag(@RequestParam String tag) {
        Tag tagSave = new Tag(null, tag);
        return service.saveTag(tagSave);
    }

    @PostMapping(path="/update_tag")
    public void updateTag(@RequestParam Integer id, @RequestParam String tag) {
        service.updateTag(id, tag);
    }

    @PostMapping(path="/delete_tag")
    public void deleteTag(@RequestParam int id) {
        service.deleteTag(id);
    }

    @PostMapping(path="/all_tags")
    public Iterable<Tag> getAllTags() {
        return service.findAll();
    }

    @PostMapping(path="/get_tag_findTextTag")
    public Optional<Tag> getTags(@RequestParam String tag) {
        return service.getTagByTagText(tag);
    }
}
