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

    private static final String GET_POST_STATUS = "" +
            "SELECT * FROM ifs_post_status WHERE user_id = ? AND post_id = ?";

    private final JdbcTemplate jdbcTemplate;

    public PostStatusDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void setPostStatusTrue(final PostStatus postStatus) {

        jdbcTemplate.update(
                MARK_POST_AS_READ,
                postStatus.getUserId(),
                postStatus.getPostId()
        );
    }

    public PostStatus getPostStatus(Integer userId, Integer postId) {

        //На перспективу(таблица ifs_post_status вероятно в будущем будет расширена)
        return jdbcTemplate.queryForObject(
                GET_POST_STATUS,
                (rs, rowNum) -> new PostStatus(
                        rs.getInt("user_id"),
                        rs.getInt("post_id")
                ),
                userId,
                postId
        );
    }
}

