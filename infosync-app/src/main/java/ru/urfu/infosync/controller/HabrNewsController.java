package ru.urfu.infosync.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.infosync.model.HabrPost;
import ru.urfu.infosync.service.HabrNewsService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.TEXT_HTML_VALUE;

@RestController
@RequestMapping(value = "habr/news", produces = APPLICATION_JSON_VALUE)
public class HabrNewsController {

    private final HabrNewsService newsService;

    public HabrNewsController(final HabrNewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public List<HabrPost> getHabrNews() {
        return newsService.getNews();
    }

    @GetMapping(value = "/{id}", produces = TEXT_HTML_VALUE)
    public String getHabrNewsById(@PathVariable int id) {
        return newsService.getNews().get(id).getPostBody();
    }
}
