package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class UserInfo {
    String firstName;
    String lastName;
    String patronymic;
    String email;
    String group;
}
