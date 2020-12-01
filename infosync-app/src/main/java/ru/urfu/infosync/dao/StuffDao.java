package ru.urfu.infosync.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.Group;
import ru.urfu.infosync.model.HabrPost;

import java.util.List;

@Component
public class StuffDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StuffDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final String SELECT_RECOMMENDED_POST_BY_GROUP_ID =
            "SELECT title, post_link, post_body FROM ifs_post WHERE group_id = ?";

    public List<HabrPost> getRecommendedPosts(Integer groupId) {
        var stuff = jdbcTemplate.query(
                SELECT_RECOMMENDED_POST_BY_GROUP_ID,
                (rs, rowNum) -> new HabrPost(rs.getString("title"), rs.getString("post_link"),
                        rs.getString("post_body")),
                groupId
        );

        return stuff.size() < 1 ? null : stuff;
    }
}
