package ru.eltex.Time.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "acts", schema = "acts")
public class Act {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(name = "act")
    private String act;

    @Column(name = "project")
    private String project;

    @Column(name = "tag")
    private String tag;

    @Column(name = "date_act")
    private Date date_act;

    @Column(name = "time_start_act")
    private Time time_start_act;

    @Column(name = "time_end_act")
    private Time time_end_act;

    @Column(name = "all_time_act")
    private Time all_time_act;

    public Act() {
    }

    public Act(Integer id, String act, String project, String tag, Date date_act,
               Time time_start_act, Time time_end_act, Time all_time_act) {
        this.id = id;
        this.act = act;
        this.project = project;
        this.tag = tag;
        this.date_act = date_act;
        this.time_start_act = time_start_act;
        this.time_end_act = time_end_act;
        this.all_time_act = all_time_act;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAct() {
        return act;
    }

    public void setAct(String act) {
        this.act = act;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Date getDate_act() {
        return date_act;
    }

    public void setDate_act(Date date_act) {
        this.date_act = date_act;
    }

    public Time getTime_start_act() {
        return time_start_act;
    }

    public void setTime_start_act(Time time_start_act) {
        this.time_start_act = time_start_act;
    }

    public Time getTime_end_act() {
        return time_end_act;
    }

    public void setTime_end_act(Time time_end_act) {
        this.time_end_act = time_end_act;
    }

    public Time getAll_time_act() {
        return all_time_act;
    }

    public void setAll_time_act(Time all_time_act) {
        this.all_time_act = all_time_act;
    }
}
