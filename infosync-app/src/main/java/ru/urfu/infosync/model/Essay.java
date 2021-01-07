package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class Essay {

    Integer id;
    Integer postId;
    Integer authorId;
    String textEssay;
}
