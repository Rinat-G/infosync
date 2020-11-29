package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.Group;

import java.util.List;

@Component
public class GroupDao {

    private static final String SELECT_ALL_GROUPS = "SELECT id, name FROM ifs_group";

    private static final String SELECT_GROUP_BY_NAME = "SELECT id, name FROM ifs_group WHERE name = ?";

    private static final String INSERT_GROUP = "INSERT INTO ifs_group (name) VALUES (?) RETURNING id";

    private final JdbcTemplate jdbcTemplate;

    public GroupDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Group> getAllGroups() {
        return jdbcTemplate.query(
                SELECT_ALL_GROUPS,
                (rs, rowNum) -> new Group(rs.getInt("id"), rs.getString("name"))
        );
    }

    public Group getGroupByName(String groupName) {
        var groups = jdbcTemplate.query(
                SELECT_GROUP_BY_NAME,
                (rs, rowNum) -> new Group(rs.getInt("id"), rs.getString("name")),
                groupName
        );

        return groups.size() < 1 ? null : groups.get(0);
    }

    public Group saveNewGroup(String groupName) {
        var id = jdbcTemplate.queryForObject(INSERT_GROUP, Integer.class, groupName);
        return new Group(id, groupName);
    }
}
