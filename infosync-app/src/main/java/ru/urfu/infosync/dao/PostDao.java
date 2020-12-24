package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.GeneralPost;
import ru.urfu.infosync.model.HabrPost;
import ru.urfu.infosync.model.UserDto;

import java.util.List;

/**
 * Component of access into ifs_post table
 *
 * @author valery
 */
@Component
public class PostDao {

    private final JdbcTemplate jdbcTemplate;

    public PostDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final String INSERT_NEW_POST = "" +
            "INSERT INTO ifs_post (title, post_link, post_body, group_id, recommended_by_user_id) " +
            "VALUES (?, ?, ?, ?, ?)";

    private static final String SELECT_RECOMMENDED_POST_BY_GROUP_ID =
            "SELECT id, title, post_link, post_body, recommended_by_user_id " +
                    "FROM ifs_post " +
                    "WHERE group_id = ? " +
                    "ORDER BY id DESC";

    private static final String SELECT_POSTS_THAT_TEACHER_GIVES_FOR_GROUP =
            "SELECT id, title, post_link, post_body, recommended_by_user_id " +
                    "FROM ifs_post " +
                    "WHERE group_id = ? AND recommended_by_user_id = ? " +
                    "ORDER BY id DESC";

    public List<GeneralPost> getRecommendedPosts(Integer groupId) {
        return jdbcTemplate.query(
                SELECT_RECOMMENDED_POST_BY_GROUP_ID,
                (rs, rowNum) -> new GeneralPost(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("post_link"),
                        rs.getString("post_body"),
                        rs.getInt("recommended_by_user_id")),
                groupId
        );
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

    public List<GeneralPost> getTeacherPostsForGroup(Integer groupId, Integer teacherId) {
        return null;
    }
}
