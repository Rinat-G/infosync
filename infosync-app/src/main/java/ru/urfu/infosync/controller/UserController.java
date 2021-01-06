package ru.urfu.infosync.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.infosync.model.Group;
import ru.urfu.infosync.service.UserService;
import ru.urfu.infosync.service.GroupService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/user", produces = APPLICATION_JSON_VALUE)
public class UserController {

    private final UserService userService;
    private final GroupService groupService;

    public UserController(UserService userService, GroupService groupService) {

        this.userService = userService;
        this.groupService = groupService;
    }

    @GetMapping(value = "/role")
    public String getUserRole(UsernamePasswordAuthenticationToken token) {
        return userService.getCurrentUserRole(token);
    }

    /**
     *
     * @return List of groups which the teacher recommended posts
     */
    @GetMapping(value = "/teacher/group", produces = APPLICATION_JSON_VALUE)
    public List<Group> getGroupsRecommendedByTeacher(UsernamePasswordAuthenticationToken token) {

        if(!userService.getCurrentUserRole(token).equals("teacher")) {

            return null;
        }
        return groupService.getGroupsRecommendedByTeacher(userService.getIdCurrentUser());
    }
}
