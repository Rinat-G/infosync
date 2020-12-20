package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.PostStatus;

@Component
public class PostStatusDao {

    private static final String MARK_POST_AS_READ = "" +
            "INSERT INTO ifs_post_status (user_id, post_id)" +
            "VALUES (?, ?)" +
            "ON CONFLICT DO NOTHING";

    private final JdbcTemplate jdbcTemplate;

    public PostStatusDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void setPostStatusTrue(final PostStatus postStatus) {

        jdbcTemplate.update(
                MARK_POST_AS_READ,
                postStatus.getUser_id(),
                postStatus.getPost_id()
        );
    }
}

