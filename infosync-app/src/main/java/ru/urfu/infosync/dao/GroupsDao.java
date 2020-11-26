package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.Group;

import java.util.List;

@Component
public class GroupsDao {

    private static final String SELECT_ALL_GROUPS = "SELECT id, name FROM ifs_group";

    private final JdbcTemplate jdbcTemplate;

    public GroupsDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Group> getAllGroups() {
        return jdbcTemplate.query(SELECT_ALL_GROUPS, (rs, rowNum) -> new Group(rs.getInt(1), rs.getString(2)));
    }
}
