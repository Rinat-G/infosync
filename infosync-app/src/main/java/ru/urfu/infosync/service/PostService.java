package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.PostDao;
import ru.urfu.infosync.model.GeneralPost;
import ru.urfu.infosync.model.GeneralPostWithStatus;
import ru.urfu.infosync.model.PostStatus;
import ru.urfu.infosync.dao.PostStatusDao;

import java.util.List;

/**
 * Tool for harvest recommended posts for student
 *
 * @author valery
 */
@Service
public class PostService {

    private final PostDao postDao;
    private final UserService userService;
    private final PostStatusDao postStatusDao;

    public PostService(final PostDao postDao, final UserService userService, final PostStatusDao postStatusDao) {
        this.postDao = postDao;
        this.userService = userService;
        this.postStatusDao = postStatusDao;
    }

    public List<GeneralPost> getNews() {
        return postDao.getRecommendedPosts(userService.getCurrentUser().getGroupId());
    }

    public List<GeneralPostWithStatus> getNewsWithStatuses() {
        return postDao.getRecommendedPostsWithStatuses(userService.getIdCurrentUser(),
                userService.getCurrentUser().getGroupId());
    }

    public void markAsRead(Integer postId) {
        postStatusDao.setPostStatusTrue(new PostStatus(userService.getIdCurrentUser(), postId));
    }
}
