package ru.eltex.Time;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ControllerMySQL {

    private final String USERNAME = "root";
    private final String PASSWORD = "22105q";
    private final String URL = "jdbc:mysql://localhost:3306/time?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";

    public void start(){
        printDataBase();
    }

    public void printDataBase(){
        Connection connection = null;
        
        try{
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);

            if (connection != null) {
                System.out.println("Подключились");
            } else {
                System.out.println("Не подключились");
            }

            connection.close();

        } catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

}
