package ru.urfu.infosync.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.NewsDao;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.News;

import java.util.List;

/**
 * Tool for harvest recommended posts for student
 * @author valery
 */
@Service
public class NewsService {

    private final NewsDao newsDao;
    private final UserDao userDao;

    public NewsService(final NewsDao newsDao, final UserDao userDao) {
        this.newsDao = newsDao;
        this.userDao = userDao;
    }

    /**
     * @return list all recommended posts for "username" using SecurityContextHolder
     */
    public List<News> getNews() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var email = authentication.getName();
        return newsDao.getRecommendedPosts(userDao.getUserByEmail(email).getGroupId());
    }
}
