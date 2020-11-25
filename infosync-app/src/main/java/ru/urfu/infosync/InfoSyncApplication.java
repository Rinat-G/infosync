package ru.urfu.infosync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class InfoSyncApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfoSyncApplication.class, args);
    }

}
