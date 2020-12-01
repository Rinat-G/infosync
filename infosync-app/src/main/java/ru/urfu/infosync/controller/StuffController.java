package ru.urfu.infosync.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.urfu.infosync.model.HabrPost;
import ru.urfu.infosync.service.StuffService;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value="/api/stuff", produces = APPLICATION_JSON_VALUE)
public class StuffController {

    private final StuffService stuffService;

    public StuffController(final StuffService stuffService) {
        this.stuffService = stuffService;
    }

    @GetMapping
    public List<HabrPost> getStuff() {
        return stuffService.getStuff();
    }
}
