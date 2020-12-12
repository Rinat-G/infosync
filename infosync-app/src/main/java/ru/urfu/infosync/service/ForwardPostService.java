package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.dao.PostDao;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.Group;
import ru.urfu.infosync.model.HabrPostToForward;

@Service
public class ForwardPostService {

    private final GroupDao groupDao;
    private final UserDao userDao;
    private final PostDao postDao;

    public ForwardPostService(final GroupDao groupDao, final UserDao userDao, final PostDao postDao) {
        this.groupDao = groupDao;
        this.userDao = userDao;
        this.postDao = postDao;
    }

    @Transactional
    public void doForward(HabrPostToForward postToForward, String from) {

        var groups = groupDao.getGroupsByNames(postToForward.getGroups());
        var fromID = userDao.getUserIdByEmail(from);

        for (Group group : groups) {
            postDao.saveNewRecommendedPost(postToForward.getHabrPost(), group.getId(), fromID);
        }
    }
}
