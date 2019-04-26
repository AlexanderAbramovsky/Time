package ru.eltex.Time.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.eltex.Time.entity.User;
import ru.eltex.Time.service.UserService;

import java.util.Optional;

@RestController
public class UserController {

    private UserService service;

    @Autowired
    public void setNoteService(UserService service) {
        this.service = service;
    }

    @CrossOrigin
    @RequestMapping(path="/get/{id}")
    public Optional<User> getUser(@PathVariable int id) {
        return service.getUserById(id);
    }

    @CrossOrigin
    @RequestMapping(path="/save")
    public void saveUser(@RequestParam(value = "id", required = false, defaultValue = "null")  Integer id,
                                   @RequestParam String fio, @RequestParam Integer number) {
        User user = new User(id, fio, number);
        service.saveUser(user);
    }

    @CrossOrigin
    @RequestMapping(path="/update")
    public void updateUser(@RequestParam Integer id, @RequestParam String fio, @RequestParam Integer number) {
        service.updateUser(id, fio, number);
    }

    @CrossOrigin
    @RequestMapping(path="/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        service.deleteUser(id);
    }

    @CrossOrigin
    @PostMapping(path="/all")
    public Iterable<User> getAllUsers() {
        return service.findAll();
    }

}