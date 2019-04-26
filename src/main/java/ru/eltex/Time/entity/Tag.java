package ru.eltex.Time.entity;

import javax.persistence.*;

@Entity
@Table(name = "tags", schema = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(name = "tag")
    private String tag;

    public Tag() {
    }

    public Tag(Integer id, String tag) {
        this.id = id;
        this.tag = tag;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

}
