package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.PostStatus;

@Component
public class PostStatusDao {

    private static final String MARK_POST_AS_READ = "INSERT INTO ifs_post_status";
}
