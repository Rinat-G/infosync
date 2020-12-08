package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class PostStatus {
    Integer user_id;
    Integer post_id;
    boolean readed;
}