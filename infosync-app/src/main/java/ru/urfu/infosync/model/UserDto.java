package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class UserDto {
    String firstName;
    String lastName;
    String patronymic;
    String email;
    String passwordHash;
    Integer groupId;
    String role;
}
