package ru.urfu.infosync.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.RegistrationResult;
import ru.urfu.infosync.model.UserDto;
import ru.urfu.infosync.model.UserJs;

@Service
public class UserService {

    private final UserDao userDao;
    private final GroupService groupService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserDao userDao, GroupService groupService, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.groupService = groupService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public RegistrationResult registerNewUser(final UserJs userJs) {

        if (emailAlreadyExist(userJs.getEmail())) {
            return new RegistrationResult(false, "Email already exist in database");
        }

        var userDto = new UserDto(
                userJs.getFirstName(),
                userJs.getLastName(),
                userJs.getPatronymic(),
                userJs.getEmail(),
                passwordEncoder.encode(userJs.getPassword()),
                groupService.createGroupOrGetId(userJs.getGroup()),
                userJs.getRole()
        );

        try {
            userDao.saveNewUser(userDto);
        } catch (Exception e) {
            return new RegistrationResult(false, e.getMessage());
        }
        return new RegistrationResult(true, "User registered successfully");
    }

    private boolean emailAlreadyExist(String email) {
        return userDao.getUserByEmail(email) != null;
    }
}