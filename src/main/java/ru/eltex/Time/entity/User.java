package ru.eltex.Time.entity;

import javax.persistence.*;

import static ru.eltex.Time.Application.NAME;

@Entity
@Table(name = NAME, schema = NAME)
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(name = "fio")
    private String fio;

    @Column(name = "number")
    private int number;

    public User() {}

    public User(String fio, int number) {
        this.fio = fio;
        this.number = number;
    }

    public User(int id, String fio, int number) {
        this.id = id;
        this.fio = fio;
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
