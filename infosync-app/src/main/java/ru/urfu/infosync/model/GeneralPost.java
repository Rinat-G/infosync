package ru.urfu.infosync.model;

import lombok.Value;

/**
 * @author valery
 */
@Value
public class GeneralPost {
    Integer id;
    String title;
    String postLink;
    String postBody;
    Integer recommendedByUserId;
}