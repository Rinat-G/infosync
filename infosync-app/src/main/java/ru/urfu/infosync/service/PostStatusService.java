package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.model.PostStatus;
import ru.urfu.infosync.service.UserService;
import ru.urfu.infosync.dao.PostStatusDao;

@Service
public class PostStatusService {

    private final UserService userService;
    private final PostStatusDao postStatusDao;;

    PostStatusService(UserService userService, PostStatusDao postStatusDao) {
        this.userService = userService;
        this.postStatusDao = postStatusDao;
    }

    public void markAsRead (Integer post_id) {
        postStatusDao.setPostStatusTrue(new PostStatus(userService.getIdCurrentUser(), post_id));
    }
}
