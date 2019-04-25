package ru.eltex.Time.repository;

import org.springframework.data.repository.CrudRepository;
import ru.eltex.Time.entity.User;

public interface UserRepository  extends CrudRepository<User, Integer> {
}
