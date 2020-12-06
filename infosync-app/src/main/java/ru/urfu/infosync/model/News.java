package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class News {
    Integer id;
    String title;
    String post_Link;
    String post_body;
    Integer recommended_by_user_id;
}