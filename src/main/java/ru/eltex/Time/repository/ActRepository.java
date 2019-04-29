package ru.eltex.Time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.eltex.Time.entity.Act;

public interface ActRepository extends JpaRepository<Act, Integer> {

}
