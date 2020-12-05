package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.HabrPost;

@Component
public class PostDao {

    public static final String INSERT_NEW_POST = "" +
            "INSERT INTO ifs_post (title, post_link, post_body, group_id, recommended_by_user_id) " +
            "VALUES (?, ?, ?, ?, ?)";

    private final JdbcTemplate jdbcTemplate;

    public PostDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveNewRecommendedPost(final HabrPost habrPost, final Integer groupId, final Integer fromId) {
        jdbcTemplate.update(
                INSERT_NEW_POST,
                habrPost.getPostTitle(),
                habrPost.getPostLink(),
                habrPost.getPostBody(),
                groupId,
                fromId
        );
    }
}
