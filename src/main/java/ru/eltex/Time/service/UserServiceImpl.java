package ru.eltex.Time.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eltex.Time.entity.User;
import ru.eltex.Time.repository.UserRepository;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository repository;

    @Autowired
    public void setProductRepository(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public void saveUser(User user) {
        repository.save(user);
    }

    @Override
    public void updateUser(Integer id, String fio, int number) {
        Optional<User> updated = repository.findById(id);
        updated.get().setFio(fio);
        updated.get().setNumber(number);
        repository.save(updated.get());
    }

    @Override
    public void deleteUser(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Iterable<User> findAll() {
        return repository.findAll();
    }
}
