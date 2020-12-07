package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class PostStatus {
    String postTitle;
    String postLink;
    String postBody;
}