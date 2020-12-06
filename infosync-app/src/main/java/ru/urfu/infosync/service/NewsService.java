package ru.urfu.infosync.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.NewsDao;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.News;
import java.util.List;

@Service
public class NewsService {

    private final NewsDao newsDao;
    private final UserDao userDao;

    public NewsService(final NewsDao newsDao, final UserDao userDao) {
        this.newsDao = newsDao;
        this.userDao = userDao;
    }

    public List<News> getNews() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var email = authentication.getName();
        System.out.println(newsDao.getRecommendedPosts(userDao.getUserByEmail(email).getGroupId()));
        return newsDao.getRecommendedPosts(userDao.getUserByEmail(email).getGroupId());
    }
}
