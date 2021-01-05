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

    private static final String ADD_ESSAY_ID = "" +
            "UPDATE ifs_post_status " +
            "SET essay_id = ? " +
            "WHERE user_id = ? AND post_id = ?";

    private static final String GET_ESSAY_ID = "" +
            "SELECT essay_id FROM ifs_post_status " +
            "WHERE user_id = ? AND post_id = ?";

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

    public void addEssayId(Integer userId, Integer postId, Integer essayId) {
        jdbcTemplate.update(
                ADD_ESSAY_ID,
                essayId,
                userId,
                postId
        );
    }

    public Integer getEssayId(Integer userId, Integer postId) {

        /*
        Возможно лишнее, но это на тот случай(в постмане понадобился),
        если запись в таблице отсутствует
        */
        setPostStatusTrue(new PostStatus(userId, postId));

        return jdbcTemplate.queryForObject(
                GET_ESSAY_ID,
                Integer.class,
                userId,
                postId
        );
    }
}

