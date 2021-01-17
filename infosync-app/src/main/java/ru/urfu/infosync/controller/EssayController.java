package ru.urfu.infosync.controller;

import org.springframework.web.bind.annotation.*;
import ru.urfu.infosync.model.Essay;
import ru.urfu.infosync.model.InteractionDBResult;
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

    ///Get user essay if exists
    @GetMapping(value = "/self")
    public String getReadEssay(@PathVariable Integer postId) {

        return essayService.getUserMadeEssay(postId);
    }

    /*
    По задумке студент пишет эссе на чистом(без статьи и других эссе на экране) экране, дабы не отвлекало.
    Проверку на роль делать не стоит, чтобы преподу дать возможность и самому писать эссе.
    */

    /**
     *
     * @return write/overwrite an own(self made) essay
     */
    @PostMapping (value = "/self")
    public InteractionDBResult writeEssay(@RequestBody final String text, @PathVariable Integer postId) {

        if (text.isEmpty()) return new InteractionDBResult(false, "Trying send empty text");
        return essayService.sendEssay(text, postId);
    }
}
