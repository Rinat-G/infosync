package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.StuffDao;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.HabrPost;
import java.util.List;
import java.security.Principal;

@Service
public class StuffService {

    private final StuffDao stuffDao;
    private final UserDao userDao;
    private Principal principal;

    public StuffService(final StuffDao stuffDao, final UserDao userDao) {
        this.stuffDao = stuffDao;
        this.userDao = userDao;
    }

    public List<HabrPost> getStuff() {
        var email = principal.getName();
        return stuffDao.getRecommendedPosts(userDao.getUserByEmail(email).getGroupId());
    }
}
