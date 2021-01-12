package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.*;

import static java.lang.String.join;
import static java.util.Collections.nCopies;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;

@Component
public class PostStatusDao {

    private static final String MARK_POST_AS_READ = "" +
            "INSERT INTO ifs_post_status (user_id, post_id)" +
            "VALUES (?, ?)" +
            "ON CONFLICT DO NOTHING";

//    private static final String GET_POST_STATUS = "" +
//            "SELECT * FROM ifs_post_status WHERE user_id = ? AND post_id = ?";

    private static final String GET_COLLECTION_OF_POST_STATUS = "" +
            "SELECT * FROM ifs_post_status " +
            "WHERE user_id IN ( $users ) AND post_id in ( $posts )";

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

//    public PostStatus getPostStatus(Integer userId, Integer postId) {
//
//        //На перспективу(таблица ifs_post_status вероятно в будущем будет расширена)
//        return jdbcTemplate.queryForObject(
//                GET_POST_STATUS,
//                (rs, rowNum) -> new PostStatus(
//                        rs.getInt("user_id"),
//                        rs.getInt("post_id")
//                ),
//                userId,
//                postId
//        );
//    }

    public void setPostStatusesForTeacher(TeacherGroupInfo info, List<User> users) {

        var posts = info.getPosts().stream().map(GroupPostStatus::getPostId).toArray(Integer[]::new);

        var inNamesSql = join(", ", nCopies(users.size(), "?"));
        var inPostsSql = join(", ", nCopies(posts.length, "?"));

        String query = GET_COLLECTION_OF_POST_STATUS
                .replace("$users", inNamesSql)
                .replace("$posts", inPostsSql);

        var setter = new PreparedStatementSetter() {

            public void setValues(@NonNull PreparedStatement preparedStatement) throws SQLException {

                var parameterIndex = 1;
                for (User user : users) {
                    preparedStatement.setInt(parameterIndex, user.getId());
                    parameterIndex++;
                }
                for (Integer post : posts) {
                    preparedStatement.setInt(parameterIndex, post);
                    parameterIndex++;
                }
            }
        };

        jdbcTemplate.query(
                query,
                setter,
                rowCallbackHandlerForTeacherInfo(info, users)
        );
    }

    private RowCallbackHandler rowCallbackHandlerForTeacherInfo (TeacherGroupInfo info, List<User> users) {

        return rs -> {
            var post = info.getPosts().stream()
                    .filter(x -> {
                        try {
                            return x.getPostId() == (rs.getInt("post_id"));
                        } catch (SQLException throwable) {
                            throwable.printStackTrace();
                        }
                        return false;
                    }).findAny().orElse(null);

            var postStatus = new PostStatus(
                    rs.getInt("user_id"),
                    rs.getInt("post_id")
            );

            var userStatus = new UserStatus(
                    Objects.requireNonNull(users.stream()
                            .filter(x -> x.getId().equals(postStatus.getUserId()))
                            .findAny().orElse(null))
                            .getFullName(),
                    postStatus
            );

            assert post != null;
            post.getStatus().add(userStatus);
        };
    }

}

