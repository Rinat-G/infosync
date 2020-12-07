package ru.urfu.infosync.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.infosync.service.PostStatusService;

@RestController
@RequestMapping(value = "/api/news/{postId:\\d+}")
public class PostStatusController {

    private final PostStatusService postStatusService;

    public PostStatusController(PostStatusService postStatusService) {
        this.postStatusService = postStatusService;
    }
}
