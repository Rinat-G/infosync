package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.EssayDao;
import ru.urfu.infosync.model.Essay;
import ru.urfu.infosync.model.InteractionDBResult;

import java.util.List;

@Service
public class EssayService {

    private final EssayDao essayDao;
    private final UserService userService;

    public EssayService(EssayDao essayDao, UserService userService) {
        this.essayDao = essayDao;
        this.userService = userService;
    }

    /**
     *
     * @param text post request for record into DB
     * @param postId Id of post
     * @return text for record equals with record in DB
     */
    public InteractionDBResult sendEssay(String text, Integer postId) {

        var userId = userService.getIdCurrentUser();

        try {
            essayDao.sendEssay(text, postId, userId);
        } catch (Exception e) {
            new InteractionDBResult(false, e.getMessage());
        }
        return new InteractionDBResult(true, "Essay successfully sent");
    }

    public String getUserMadeEssay(Integer postId) {

        return essayDao.getUserMadeEssay(postId, userService.getIdCurrentUser());
    }

    public List<Essay> getAllEssaysOfPost(Integer postId) {
        return essayDao.getAllEssayByPostId(postId);
    }
}
