package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.PostStatus;
import ru.urfu.infosync.model.PostWithStatuses;
import ru.urfu.infosync.model.TeacherGroupInfo;
import ru.urfu.infosync.model.UserPostStatus;

import java.util.ArrayList;
import java.util.List;

@Component
public class PostStatusDao {

    //language=PostgreSQL
    private static final String MARK_POST_AS_READ = "" +
            "INSERT INTO ifs_post_status (user_id, post_id)" +
            "VALUES (?, ?)" +
            "ON CONFLICT DO NOTHING";

    //language=PostgreSQL
    private static final String GET_POSTS_WITH_STATUSES_FROM_GROUP_FOR_TEACHER = "" +
            "SELECT post.id AS post_id, " +
            "       post.title AS title, " +
            "       iuser.full_name AS full_name, " +
            "       CASE WHEN post_status.USER_ID IS null THEN false ELSE true END AS read_status " +
            "FROM ifs_post post " +
            "INNER JOIN ifs_user iuser ON post.group_id = iuser.group_id " +
            "LEFT JOIN ifs_post_status post_status ON post.id = post_status.post_id AND iuser.ID = post_status.user_id " +
            "WHERE recommended_by_user_id = ? " +
            "  AND post.group_id = ? " +
            "ORDER BY post.ID, full_name";

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

    public TeacherGroupInfo getPostsAndStatusesFromGroup(Integer groupId, Integer teacherId) {
        var posts = jdbcTemplate.query(
                GET_POSTS_WITH_STATUSES_FROM_GROUP_FOR_TEACHER,
                groupPostWithStatusesRSE(),
                teacherId,
                groupId
        );

        return new TeacherGroupInfo(groupId, teacherId, posts);
    }

    private ResultSetExtractor<List<PostWithStatuses>> groupPostWithStatusesRSE() {
        return rs -> {
            var posts = new ArrayList<PostWithStatuses>();
            int currentPostId = 0;
            PostWithStatuses currentPost = new PostWithStatuses(null, null, null);

            while (rs.next()) {
                if (currentPostId != rs.getInt(1)) {
                    currentPostId = rs.getInt(1);
                    currentPost = new PostWithStatuses(currentPostId, rs.getString(2), new ArrayList<>());
                    posts.add(currentPost);
                }
                currentPost.getStatuses().add(new UserPostStatus(rs.getString(3), rs.getBoolean(4)));

            }
            return posts;
        };
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

