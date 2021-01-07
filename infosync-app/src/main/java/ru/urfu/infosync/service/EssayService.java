package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.EssayDao;
import ru.urfu.infosync.dao.PostStatusDao;
import ru.urfu.infosync.model.Essay;

import java.util.List;

@Service
public class EssayService {

    private final EssayDao essayDao;
    private final UserService userService;
    private final PostStatusDao postStatusDao;

    public EssayService(EssayDao essayDao, UserService userService, PostStatusDao postStatusDao) {
        this.essayDao = essayDao;
        this.userService = userService;
        this.postStatusDao = postStatusDao;
    }

    public boolean sendEssay(String text, Integer postId) {

        var userId = userService.getIdCurrentUser();
        if (text.isEmpty()) return false;
        var essayId = essayDao.sendEssay(text, postId, userId);
        postStatusDao.addEssayId(userId, postId, essayId);
        return text.equals(essayDao.getUserMadeEssay(postId, userId));
    }

    public String getUserMadeEssay(Integer postId) {

        return essayDao.getUserMadeEssay(postId, userService.getIdCurrentUser());
    }

    public List<Essay> getAllEssaysOfPost(Integer postId) {
        System.out.println("EssayService.getAllEssaysOfPost");
        return essayDao.getAllEssayByPostId(postId);
    }
}
