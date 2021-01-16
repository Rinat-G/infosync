package ru.urfu.infosync.model;

import lombok.Value;

import java.util.List;

@Value
public class TeacherGroupInfo {

    Integer groupId;
    Integer teacherId;
    List<PostWithStatuses> postsWithStatuses;
}
