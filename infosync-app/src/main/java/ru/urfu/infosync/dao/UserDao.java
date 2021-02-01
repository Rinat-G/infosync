package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.User;
import ru.urfu.infosync.model.UserDto;
import ru.urfu.infosync.model.UserInfo;

import java.util.List;

@Component
public class UserDao {

    private static final String SELECT_USER_BY_EMAIL = "" +
            "SELECT * FROM ifs_user WHERE email = ?";

    private static final String SELECT_USER_ID_BY_EMAIL = "" +
            "SELECT id FROM ifs_user WHERE email = ?";

    private static final String INSERT_NEW_USER = "" +
            "INSERT INTO ifs_user (first_name, last_name, patronymic, email, pass_hash, group_id, role)" +
            "VALUES (?, ?, ?, ?, ?, ?, ?)";

    private static final String GET_USERS_ROLE = "" +
            "SELECT role FROM ifs_user WHERE Id = ?";

    private static final String SELECT_USERS_BY_GROUP_ID = "" +
            "SELECT id, full_name FROM ifs_user " +
            "WHERE group_id = ? " +
            "ORDER BY full_name";

    //language=PostgreSQL
    private static final String SELECT_USER_INFO = "" +
            "SELECT ifs_user.first_name, ifs_user.last_name, ifs_user.patronymic, ifs_user.email, ifs_group.title " +
            "FROM infosync.ifs_user " +
            "LEFT JOIN infosync.ifs_group on ifs_group.id = infosync.ifs_user.group_id " +
            "WHERE ifs_user.email = ? " +
            "LIMIT 1";

    private final JdbcTemplate jdbcTemplate;

    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveNewUser(final UserDto userDto) {
        jdbcTemplate.update(
                INSERT_NEW_USER,
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getPatronymic(),
                userDto.getEmail(),
                userDto.getPasswordHash(),
                userDto.getGroupId(),
                userDto.getRole()
        );
    }

    public UserInfo getUserInfo(final String email) {
        return jdbcTemplate.queryForObject(
                SELECT_USER_INFO,
                (rs, rowNum) -> new UserInfo(
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("patronymic"),
                        rs.getString("email"),
                        rs.getString("title")
                ),
                email
        );
    }

    public UserDto getUserByEmail(final String email) {

        var users = jdbcTemplate.query(
                SELECT_USER_BY_EMAIL,
                (rs, rowNum) -> new UserDto(
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("patronymic"),
                        rs.getString("email"),
                        rs.getString("pass_hash"),
                        rs.getInt("group_id"),
                        rs.getString("role")
                ),
                email
        );

        return users.size() < 1 ? null : users.get(0);
    }

    public Integer getUserIdByEmail(final String email) {

        return jdbcTemplate.queryForObject(
                SELECT_USER_ID_BY_EMAIL,
                Integer.class,
                email
        );
    }

    public String getUsersRoleById(final Integer userId) {
        return jdbcTemplate.queryForObject(
                GET_USERS_ROLE,
                String.class,
                userId
        );
    }

    public List<User> getUsersByGroupId(final Integer groupId) {

        return jdbcTemplate.query(
                SELECT_USERS_BY_GROUP_ID,
                (rs, rowNum) -> new User(
                        rs.getInt("id"),
                        rs.getString("full_name")
                ),
                groupId
        );
    }
}
