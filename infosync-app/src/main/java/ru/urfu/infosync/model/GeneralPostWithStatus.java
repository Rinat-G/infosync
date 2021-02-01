package ru.urfu.infosync.model;

import lombok.Value;

@Value
public class GeneralPostWithStatus {
    GeneralPost post;
    boolean status;
}
