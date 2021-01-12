package ru.urfu.infosync.model;

import lombok.Value;

import java.util.List;

@Value
public class GroupPostStatus {

    Integer postId;
    String title;
    List<UserStatus> status;
}
