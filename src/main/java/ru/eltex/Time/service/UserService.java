package ru.eltex.Time.service;

import ru.eltex.Time.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserById(Integer id);
    void saveUser(User note);
    void updateUser(Integer id, String fio, int number);
    void deleteUser(Integer id);
    Iterable<User> findAll();
}
