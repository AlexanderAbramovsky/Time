package ru.eltex.Time.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

/** Сущность для работы с таблицей acts базы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.0.0
 */
@Entity
@Table(name = "acts", schema = "acts")
public class Act {

    /** Id акта */
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    /** Текст акта, задание которое выполнялось в это время */
    @Column(name = "act")
    private String act;

    /** К какому проекту принадлежал акт */
    @Column(name = "project")
    private String project;

    /** Текст тега к которому принадлежит акт */
    @Column(name = "tag")
    private String tag;

    /** Дата когда был создан акт */
    @Column(name = "date_act")
    private String date_act;

    /** Время когда был создан акт */
    @Column(name = "time_start_act")
    private String time_start_act;

    /** Время когда закончили акт */
    @Column(name = "time_end_act")
    private String time_end_act;

    /** Общее время выполнения акта */
    @Column(name = "all_time_act")
    private String all_time_act;

    /**
     * Пустой конструктор класса
     */
    public Act() {
    }

    /**
     * Конструктор класса создающий объект с определенными значениями
     * @param id - id акта
     * @param act - текст задания
     * @param project - к какому проекту относился акт
     * @param tag - к какому тегу относился акт
     * @param date_act - когда создавался акт
     * @param time_start_act - время начала акта
     * @param time_end_act - время окончания акта
     * @param all_time_act - общее время выполнения акта
     */
    public Act(Integer id, String act, String project, String tag, String date_act,
               String time_start_act, String time_end_act, String all_time_act) {
        this.id = id;
        this.act = act;
        this.project = project;
        this.tag = tag;
        this.date_act = date_act;
        this.time_start_act = time_start_act;
        this.time_end_act = time_end_act;
        this.all_time_act = all_time_act;

        System.out.println();
        System.out.println(act + " " + project + " " + tag + " " +  date_act + " " +  time_start_act + " " +  time_end_act + " " +  all_time_act);
        System.out.println();
    }

    /**
     * Возвращает id акта
     * @return - возвращает id акта
     */
    public Integer getId() {
        return id;
    }

    /**
     * Устанавливает id акта
     * @param id - устанавливает id акта
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Возвращает текст действия
     * @return - возвращает текст акта
     */
    public String getAct() {
        return act;
    }

    /**
     * Устанавливает текст действия
     * @param act - текст акта
     */
    public void setAct(String act) {
        this.act = act;
    }

    /**
     * Возвращает текст проекта к которому относится акт
     * @return - возвращает текст проекта
     */
    public String getProject() {
        return project;
    }

    /**
     * Устанавливает текст проекта к которому относится акт
     * @param project - текст проекта
     */
    public void setProject(String project) {
        this.project = project;
    }

    /**
     * Возвращает текст тега к которому относится акт
     * @return - возвращает текст тега
     */
    public String getTag() {
        return tag;
    }

    /**
     * Устанавливает текст тега к которому относится акт
     * @param tag - текст тега
     */
    public void setTag(String tag) {
        this.tag = tag;
    }

    /**
     * Возвращает дату создания акта
     * @return - возвращает дату создания проекта
     */
    public String getDate_act() {
        return date_act;
    }

    /**
     * Устанавливает дату создания акта
     * @param date_act - дата создания акта
     */
    public void setDate_act(String date_act) {
        this.date_act = date_act;
    }

    /**
     * Возвращает время старта акта
     * @return - возвращает время старта акта
     */
    public String getTime_start_act() {
        return time_start_act;
    }

    /**
     * Устанавливает время старта акта
     * @param time_start_act - время старта акта
     */
    public void setTime_start_act(String time_start_act) {
        this.time_start_act = time_start_act;
    }

    /**
     * Возвращает время окночания акта
     * @return - возвращает время окончания акта
     */
    public String getTime_end_act() {
        return time_end_act;
    }

    /**
     * Устанавливает время окончания акта
     * @param time_end_act - время окончания акта
     */
    public void setTime_end_act(String time_end_act) {
        this.time_end_act = time_end_act;
    }

    /**
     * Возвращает общее время действия акта
     * @return - Возвращает общее время действия акта
     */
    public String getAll_time_act() {
        return all_time_act;
    }

    /**
     * Устанавливает общее время действия акта
     * @param all_time_act - общее время действия акта
     */
    public void setAll_time_act(String all_time_act) {
        this.all_time_act = all_time_act;
    }
}
