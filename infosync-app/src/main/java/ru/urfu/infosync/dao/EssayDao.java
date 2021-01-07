package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.Essay;

import java.util.List;

@Component
public class EssayDao {

    private static final String SEND_ESSAY = "" +
            "INSERT INTO ifs_essay (post_id, author_id, essay_text) " +
            "VALUES (?, ?, ?) " +
            "ON CONFLICT (post_id, author_id) DO UPDATE SET essay_text = ?" +
            "RETURNING id ";


    private static final String GET_ESSAY_BY_ID = "" +
            "SELECT essay_text FROM ifs_essay " +
            "WHERE id = ?";

    private static final String GET_ESSAYS_BY_POST_ID = "" +
            "SELECT * FROM ifs_essay " +
            "WHERE post_id = ?";

    private final JdbcTemplate jdbcTemplate;
    private final PostStatusDao postStatusDao;

    public EssayDao(final JdbcTemplate jdbcTemplate, PostStatusDao postStatusDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.postStatusDao = postStatusDao;
    }

    public Integer sendEssay(String text, Integer postId, Integer authorId) {

        return jdbcTemplate.queryForObject(
                SEND_ESSAY,
                Integer.class,
                postId,
                authorId,
                text,
                text
        );
    }

    public String getUserMadeEssay(Integer postId, Integer userId) {

        var essayId = postStatusDao.getEssayId(userId, postId);
        if (essayId != null) {
            return jdbcTemplate.queryForObject(
                    GET_ESSAY_BY_ID,
                    String.class,
                    essayId
            );
        }
        return null;
    }

    public List<Essay> getAllEssayByPostId(Integer postId) {
        System.out.println("EssayDao.getAllEssaysByPostId");
        return jdbcTemplate.query(
                GET_ESSAYS_BY_POST_ID,
                (rs, rowNum) -> new Essay(
                        rs.getInt("id"),
                        rs.getInt("post_id"),
                        rs.getInt("author_id"),
                        rs.getString("essay_text")
                ),
                postId
        );
    }
}
