package ru.urfu.infosync.controller;

import org.springframework.web.bind.annotation.*;
import ru.urfu.infosync.model.Essay;
import ru.urfu.infosync.service.EssayService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/{postId:\\d++}/essay", produces = APPLICATION_JSON_VALUE)
public class EssayController {

    private final EssayService essayService;

    public EssayController(EssayService essayService) {
        this.essayService = essayService;
    }

    ///Get all essays of post
    @GetMapping
    public List<Essay> getAllEssaysOfPost(@PathVariable Integer postId) {
        System.out.println("EssayController.getAllEssaysOfPost");
        return essayService.getAllEssaysOfPost(postId);
    }

    //Get essays of post by group id
    @GetMapping(value = "/{groupId:\\d++}")
    public Essay getEssaysOfPostByGroupId(@PathVariable Integer postId, @PathVariable Integer groupId) {

        return null;
    }


    ///Get user essay if exists
    @GetMapping(value = "/self")
    public String getReadEssay(@PathVariable Integer postId) {

        return essayService.getUserMadeEssay(postId);
    }

    /*
    По задумке студент пишет эссе на чистом(без статьи и других эссе на экране) экране, дабы не отвлекало.
    Проверку на роль делать не стоит, чтобы преподу дать возможность и самому писать эссе.
    В будущем можно добавить requestEntity, чтобы допустим препод мог ограничения на минимальный объем добавить.
    Пока оставлю проверку отправленный текст = тексту из базы.
    */

    /**
     *
     * @return write/overwrite an own(self made) essay
     */
    @PostMapping (value = "/self")
    public boolean writeEssay(@RequestBody final String text, @PathVariable Integer postId) {

        return essayService.sendEssay(text, postId);
    }
}
