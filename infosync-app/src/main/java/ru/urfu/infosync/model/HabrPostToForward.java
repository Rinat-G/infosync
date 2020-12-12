package ru.urfu.infosync.model;

import lombok.Value;

import java.util.List;

@Value
public class HabrPostToForward {
    List<String> groups;
    HabrPost habrPost;
}
