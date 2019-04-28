package ru.eltex.Time.entity;

import javax.persistence.*;

/** Сущность для работы с таблицей tags базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@Entity
@Table(name = "tags", schema = "tags")
public class Tag {

    /** id тега*/
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    /** текст тега */
    @Column(name = "tag")
    private String tag;

    /**
     * Пустой конструктор класса
     */
    public Tag() {
    }

    /**
     * Конструктор класса создающий объект с определенными значениями
     * @param id - id тега
     * @param tag - текст тега
     */
    public Tag(Integer id, String tag) {
        this.id = id;
        this.tag = tag;
    }

    /**
     * Возвращает id тега
     * @return - id тега
     */
    public Integer getId() {
        return id;
    }

    /**
     * Устанавливает id тега
     * @param id - id тега
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Возвращает текст тега
     * @return - возвращает текст тега
     */
    public String getTag() {
        return tag;
    }

    /**
     * Устанавливает текст тега
     * @param tag - текст тега
     */
    public void setTag(String tag) {
        this.tag = tag;
    }

}
