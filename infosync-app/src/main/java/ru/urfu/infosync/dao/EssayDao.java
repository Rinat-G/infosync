package ru.urfu.infosync.dao;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.Essay;

import java.util.List;

@Component
public class EssayDao {

    private static final String SEND_ESSAY = "" +
            "INSERT INTO ifs_essay (post_id, author_id, essay_text) " +
            "VALUES (?, ?, ?) " +
            "ON CONFLICT (post_id, author_id) DO UPDATE SET essay_text = ?";

    private static final String GET_ESSAY_BY_POST_AND_USER = "" +
            "SELECT essay_text FROM ifs_essay " +
            "WHERE post_id = ? AND author_id = ?";

    private static final String GET_ESSAYS_BY_POST_ID = "" +
            "SELECT * FROM ifs_essay " +
            "WHERE post_id = ?";

    private final JdbcTemplate jdbcTemplate;

    public EssayDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void sendEssay(String text, Integer postId, Integer authorId) {

        jdbcTemplate.update(
                SEND_ESSAY,
                postId,
                authorId,
                text,
                text
        );
    }

    public String getUserMadeEssay(Integer postId, Integer userId) {

        try {
            return jdbcTemplate.queryForObject(
                    GET_ESSAY_BY_POST_AND_USER,
                    String.class,
                    postId,
                    userId
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

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
