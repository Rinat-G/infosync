package ru.urfu.infosync.model;
import lombok.Value;

@Value
public class UserStatus {

    String fullName;
    PostStatus postStatus;
}
