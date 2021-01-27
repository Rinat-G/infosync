package ru.urfu.infosync.controller;

import org.springframework.web.bind.annotation.*;
import ru.urfu.infosync.model.HabrPost;
import ru.urfu.infosync.service.HabrNewsService;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.TEXT_HTML_VALUE;

@RestController
@RequestMapping(value = "/api/habr/news", produces = APPLICATION_JSON_VALUE)

public class HabrNewsController {

    private final HabrNewsService newsService;

    public HabrNewsController(final HabrNewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping

    public List<HabrPost> getHabrNews() {
        return newsService.getNews();
    }

    @GetMapping(value = "/url", produces = TEXT_HTML_VALUE)

    public String getHabrNews(@RequestParam String link) {
        return newsService.getNews(link);
    }

}