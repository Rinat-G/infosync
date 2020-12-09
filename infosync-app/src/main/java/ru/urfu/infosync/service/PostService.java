package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.PostDao;
import ru.urfu.infosync.model.GeneralPost;

import java.util.List;

/**
 * Tool for harvest recommended posts for student
 * @author valery
 */
@Service
public class PostService {

    private final PostDao postDao;
    private final UserService userService;

    public PostService(final PostDao postDao, final UserService userService) {
        this.postDao = postDao;
        this.userService = userService;
    }

    public List<GeneralPost> getNews() {
        return postDao.getRecommendedPosts(userService.GetDataOfCurrentUser().getGroupId());
    }
}
