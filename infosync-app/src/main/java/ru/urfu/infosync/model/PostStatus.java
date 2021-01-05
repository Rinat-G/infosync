package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class PostStatus {
    Integer userId;
    Integer postId;
    Integer essayId;

    public PostStatus(Integer userId, Integer postId) {
        this.userId = userId;
        this.postId = postId;
        this.essayId = null;
    }
}