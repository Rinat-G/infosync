package ru.urfu.infosync.model;

import lombok.Value;

import java.util.List;

@Value
public class GroupPostWithStatuses {

    Integer postId;
    String title;
    List<UserPostStatus> statuses;
}
