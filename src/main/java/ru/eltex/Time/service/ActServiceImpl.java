package ru.eltex.Time.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eltex.Time.entity.Act;
import ru.eltex.Time.repository.ActRepository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Optional;

/** Класс Service реализующий интерфейс ActService,
 *  реализует методы для работы с таблицей acts
 *  бызы данных mysql
 * @author Абрамовский Александр sahan.abr@yandex.ru
 * @version 1.3.0
 */
@Service
public class ActServiceImpl implements ActService{

    /** Объект репозитория для управления таблицей acts */
    private ActRepository repository;

    /**
     * Инициализация объекта репозитория
     * @param repository - объект репозитория
     */
    @Autowired
    public void setActRepository(ActRepository repository) {
        this.repository = repository;
    }

    /**
     * Удаляем акт по его id
     * @param id - id акта
     */
    @Override
    public void deleteAct(Integer id) {
        repository.deleteById(id);
    }

    /**
     * Возвращает Act по его id
     * @param id - id акта
     * @return - возвращает Act
     */
    @Override
    public Optional<Act> getActById(Integer id) {
        return repository.findById(id);
    }

    /**
     * Обновляет текст акта по его id
     * @param id - id акта
     * @param act - новый текст акта
     */
    @Override
    public void updateAct(Integer id, String act) {
        Optional<Act> updated = repository.findById(id);
        updated.get().setAct(act);
        repository.save(updated.get());
    }

    @Override
    public void deleteTagAct(Integer id, String tag) {
        Optional<Act> updated = repository.findById(id);
        String[] tmp = updated.get().getTag().split("-;-");
        String newTag = "";

        if (tmp.length == 1){

        }

        for (int i = 0; i < tmp.length; i++){

            if (i == tmp.length-1 && !tmp[i].equals(tag)){
                newTag += tmp[i];
                continue;
            }

            if(!tmp[i].equals(tag)){
                newTag += tmp[i] + "-;-" ;
            }
        }
        updated.get().setTag(newTag);
        repository.save(updated.get());

    }

    @Override
    public void addTagAct(Integer id, String tag) {
        Optional<Act> updated = repository.findById(id);
        String tmp =  updated.get().getTag();
        if(tmp.equals("")){
            updated.get().setTag(tag);
        } else {
            updated.get().setTag(tmp + "-;-" + tag);
        }
        repository.save(updated.get());
    }

    @Override
    public void deleteAllTagAct(String tag) {
        Iterable<Act> acts = findAllAct();

        for (Act act: acts) {
            String[] tmp = act.getTag().split("-;-");
            String newTag = "";

            if (tmp.length == 1){

            }
            for (int i = 0; i < tmp.length; i++){

                if (i == tmp.length-1 && !tmp[i].equals(tag)){
                    newTag += tmp[i];
                    continue;
                }

                if(!tmp[i].equals(tag)){
                    newTag += tmp[i] + "-;-" ;
                }
            }
            act.setTag(newTag);
            repository.save(act);

        }
    }

    /**
     * Возвращает все акты за определенный день
     * @param date_act - дата создания акта
     * @return - возвращает акты за опр еделенный день
     */
    @Override
    public Iterable<Act> getActByDate(String date_act) {
        return repository.findOneByDateAct(date_act);
    }

    /**
     * Возвращает общее время актов за определенный день
     * @param date_act - дата акта за который нужно получить общее время
     * @return - время
     */
    @Override
    public String getAllTimeDate(String date_act) {

        Iterable<Act> acts = getActByDate(date_act);

        int seconds = 0;
        int minutes = 0;
        int hours = 0;

        for (Act act: acts) {
            String all_time_act = act.getAll_time_act();
            String[] time = all_time_act.split(":");

            seconds += Integer.parseInt(time[2]);

            if(seconds > 59){
                minutes += 1;
                seconds -= 60;
            }

            minutes += Integer.parseInt(time[1]);

            if(minutes > 59){
                hours += 1;
                minutes -= 60;
            }

            hours += Integer.parseInt(time[0]);
        }

        String hoursStr = ((hours < 10) ? "0" : "") + hours;
        String minutesStr = ((minutes < 10) ? "0" : "") + minutes;
        String secondsStr = ((seconds < 10) ? "0" : "") + seconds;

        return hoursStr + ":" + minutesStr + ":" + secondsStr;
    }

    /**
     * Возвращает все уникальные даты создания актов из таблицы acts
     * отрезаем время от даты т.к. в таблице используется тип данных DateTime
     * @return - возвращает даты
     */
    @Override
    public Iterable<String> findAllDistinctDate() {
        return repository.findAllDistinctDate();
    }

    /**
     * Сохраняет в базу данных объект Act
     * @param act - объект класса Act
     * @return - возвращает сохранённый объект Act
     */
    @Override
    public Optional<Act> saveAct(Act act) {
        repository.save(act);
        return Optional.of(act);
    }

    /**
     * Возвращает все объекты Act из таблицы
     * @return - возвращает объекты Act
     */
    @Override
    public Iterable<Act> findAllAct() {
        return repository.findAll();
    }
}
