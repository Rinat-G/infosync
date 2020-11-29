package ru.urfu.infosync.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.infosync.model.UserDto;

@Component
public class UserDao {

    private static final String SELECT_USER_BY_EMAIL = "" +
            "SELECT * FROM ifs_user WHERE email = ?";

    private static final String INSERT_NEW_USER = "" +
            "INSERT INTO ifs_user (first_name, last_name, patronymic, email, pass_hash, group_id)" +
            "VALUES (?, ?, ?, ?, ?, ?)";

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
                userDto.getGroupId()
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
}
