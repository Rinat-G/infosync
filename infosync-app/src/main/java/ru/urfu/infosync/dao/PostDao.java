package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.GeneralPost;
import ru.urfu.infosync.model.GeneralPostWithStatus;
import ru.urfu.infosync.model.HabrPost;

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

    private static final String SELECT_RECOMMENDED_POST_BY_GROUP_ID = "" +
            "SELECT id, title, post_link, post_body, recommended_by_user_id " +
            "FROM ifs_post " +
            "WHERE group_id = ? " +
            "ORDER BY id DESC";

    //language=PostgreSQL
    private static final String SELECT_RECOMMENDED_POSTS_WITH_STATUSES = "" +
            "SELECT ifs_post.id, " +
            "       ifs_post.title, " +
            "       ifs_post.post_link, " +
            "       ifs_post.post_body, " +
            "       ifs_post.recommended_by_user_id, " +
            "       CASE WHEN ifs_post_status.user_id IS null THEN false ELSE true END AS read_status " +
            "FROM ifs_post " +
            "LEFT JOIN ifs_post_status ON " +
            "ifs_post.id = ifs_post_status.post_id AND ? = ifs_post_status.user_id " +
            "WHERE ifs_post.group_id = ? " +
            "ORDER BY  read_status, ifs_post.id DESC";

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

    public List<GeneralPostWithStatus> getRecommendedPostsWithStatuses(Integer userId, Integer groupId) {
        return jdbcTemplate.query(
                SELECT_RECOMMENDED_POSTS_WITH_STATUSES,
                (rs, rowNum) -> new GeneralPostWithStatus(
                        new GeneralPost(
                                rs.getInt("id"),
                                rs.getString("title"),
                                rs.getString("post_link"),
                                rs.getString("post_body"),
                                rs.getInt("recommended_by_user_id")),
                        rs.getBoolean("read_status")
                ),
                userId,
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

}
