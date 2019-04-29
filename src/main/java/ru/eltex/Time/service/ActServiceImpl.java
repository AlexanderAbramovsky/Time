package ru.eltex.Time.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.repository.ActRepository;

@Service
public class ActServiceImpl implements ActService{

    private ActRepository repository;

    @Autowired
    public void setActRepository(ActRepository repository) {
        this.repository = repository;
    }


    @Override
    public Iterable<Act> findAllAct() {
        return repository.findAll();
    }
}
