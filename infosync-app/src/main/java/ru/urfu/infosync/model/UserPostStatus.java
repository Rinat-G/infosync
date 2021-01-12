package ru.urfu.infosync.model;
import lombok.Data;
import lombok.Value;

@Value
public class UserPostStatus {

    String fullName;
    boolean isRead;
}
