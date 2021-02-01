package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.Group;

import java.util.Collection;
import java.util.List;

import static java.lang.String.join;
import static java.util.Collections.nCopies;

@Component
public class GroupDao {

    private static final String SELECT_ALL_GROUPS = "SELECT id, title FROM ifs_group";

    private static final String SELECT_GROUP_BY_NAME = "SELECT id, title FROM ifs_group WHERE title = ?";

    private static final String SELECT_GROUPS_BY_NAMES = "SELECT id, title FROM ifs_group WHERE title in ( $names )";

    private static final String INSERT_GROUP = "INSERT INTO ifs_group (title) VALUES (?) RETURNING id";

    //language=PostgreSQL
    private static final String SELECT_MEMBERS_OF_GROUP = "" +
            "SELECT ifs_user.full_name " +
            "FROM infosync.ifs_user " +
            "JOIN infosync.ifs_group on ifs_user.group_id = ifs_group.id " +
            "WHERE ifs_group.id = " +
            "   (SELECT ifs_user.group_id FROM infosync.ifs_user " +
            "   WHERE ifs_user.email = ? LIMIT 1)";

    private final JdbcTemplate jdbcTemplate;

    public GroupDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<String> getGroupMembers(String email) {

        return jdbcTemplate.query(
                SELECT_MEMBERS_OF_GROUP,
                (rs, rowNum) -> rs.getString("full_name"),
                email);
    }

    public List<Group> getAllGroups() {
        return jdbcTemplate.query(
                SELECT_ALL_GROUPS,
                (rs, rowNum) -> new Group(rs.getInt("id"), rs.getString("title"))
        );
    }

    public Group getGroupByName(String groupName) {
        var groups = jdbcTemplate.query(
                SELECT_GROUP_BY_NAME,
                (rs, rowNum) -> new Group(rs.getInt("id"), rs.getString("title")),
                groupName
        );

        return groups.size() < 1 ? null : groups.get(0);
    }

    public Collection<Group> getGroupsByNames(List<String> groupNames) {

        var inClauseSql = join(", ", nCopies(groupNames.size(), "?"));

        return jdbcTemplate.query(
                SELECT_GROUPS_BY_NAMES.replace("$names", inClauseSql),
                (rs, rowNum) -> new Group(rs.getInt("id"), rs.getString("title")),
                groupNames.toArray()
        );
    }

    public Group saveNewGroup(String groupName) {
        var id = jdbcTemplate.queryForObject(INSERT_GROUP, Integer.class, groupName);
        return new Group(id, groupName);
    }
}
