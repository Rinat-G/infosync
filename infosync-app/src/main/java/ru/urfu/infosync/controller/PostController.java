package ru.urfu.infosync.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import ru.urfu.infosync.model.GeneralPost;
import ru.urfu.infosync.service.PostService;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value="/api/news", produces = APPLICATION_JSON_VALUE)
public class PostController {

    private final PostService postService;

    public PostController(final PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<GeneralPost> getNews() {
        return postService.getNews();
    }
}
