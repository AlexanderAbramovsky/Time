package ru.eltex.Time.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eltex.Time.entity.Tag;
import ru.eltex.Time.repository.TagRepository;

import java.util.Optional;

@Service
public class TagServiceImpl implements TagService {

    private TagRepository repository;

    @Autowired
    public void setProductRepository(TagRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Tag> getTagByTagText(String tag) {
        return repository.findOneByTag(tag);
    }

    @Override
    public Optional<Tag> getTagById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Tag> saveTag(Tag tag) {
        repository.save(tag);
        return repository.findOneByTag(tag.getTag());
    }

    @Override
    public void updateTag(Integer id, String tag) {
        Optional<Tag> updated = repository.findById(id);
        updated.get().setId(id);
        updated.get().setTag(tag);
        repository.save(updated.get());
    }

    @Override
    public void deleteTag(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Iterable<Tag> findAll() {
        return repository.findAll();
    }
}
