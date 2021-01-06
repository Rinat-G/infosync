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

    private static final String SELECT_ALL_GROUPS = "SELECT id, name FROM ifs_group";

    private static final String SELECT_GROUP_BY_NAME = "SELECT id, name FROM ifs_group WHERE name = ?";

    private static final String SELECT_GROUPS_BY_NAMES = "SELECT id, name FROM ifs_group WHERE name in ( $names )";

    private static final String INSERT_GROUP = "INSERT INTO ifs_group (name) VALUES (?) RETURNING id";

    private static final String SELECT_GROUPS_NAMES_BY_INDEXES = "SELECT * FROM ifs_group WHERE id in ( $indexes )";

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

    public Collection<Group> getGroupsByNames(List<String> groupNames) {

        var inClauseSql = join(", ", nCopies(groupNames.size(), "?"));
        return jdbcTemplate.query(
                SELECT_GROUPS_BY_NAMES.replace("$names", inClauseSql),
                (rs, rowNum) -> new Group(rs.getInt("id"), rs.getString("name")),
                groupNames.toArray()
        );
    }

    public Group saveNewGroup(String groupName) {

        var id = jdbcTemplate.queryForObject(INSERT_GROUP, Integer.class, groupName);
        return new Group(id, groupName);
    }

    /**
     *
     * @param indexes - indexes of groups
     * @return List of groups by their indexes
     */
    public List<Group> getGroupsNamesByIndexes(List<Integer> indexes) {

        var inClauseSql = join(", ", nCopies(indexes.size(), "?"));
        return jdbcTemplate.query(
                SELECT_GROUPS_NAMES_BY_INDEXES.replace("$indexes", inClauseSql),
                (rs, rowNum) -> new Group(rs.getInt("id"), rs.getString("name")),
                indexes.toArray()
        );
    }
}
