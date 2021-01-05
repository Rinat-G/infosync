package ru.urfu.infosync.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.urfu.infosync.service.EssayService;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/{postId:\\d++}/essay", produces = APPLICATION_JSON_VALUE)
public class EssayController {

    private final EssayService essayService;

    public EssayController(EssayService essayService) {
        this.essayService = essayService;
    }

    ///Get user essay if exists
    @GetMapping(value = "/self")
    public String getReadEssay(@PathVariable Integer postId) {

        return essayService.getUserMadeEssay(postId);
    }

    //По задумке студент пишет эссе на чистом(без статьи и других эссе на экране) экране, дабы не отвлекало
    //Проверку на роль делать не стоит, чтобы преподу дать возможность и самому писать эссе
    //В будущем можно добавить requestEntity, чтобы допустим препод мог ограничения на минимальный объем добавить
    //Пока оставлю проверку отправленный текст = тексту из базы
    @PostMapping (value = "/self")
    public boolean writeEssay(@RequestBody final String text, @PathVariable Integer postId){

        return essayService.sendEssay(text, postId);
    }
}
