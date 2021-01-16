package ru.urfu.infosync.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.model.Group;
import ru.urfu.infosync.model.TeacherGroupInfo;
import ru.urfu.infosync.service.GroupService;
import ru.urfu.infosync.service.UserService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/groups", produces = APPLICATION_JSON_VALUE)
public class GroupsController {

    private final GroupDao groupDao;
    private final UserService userService;
    private final GroupService groupService;

    public GroupsController(final GroupDao groupDao, final UserService userService,
                            final GroupService groupService) {

        this.groupDao = groupDao;
        this.userService = userService;
        this.groupService = groupService;
    }

    @GetMapping
    public List<Group> getGroups() {
        return groupDao.getAllGroups();
    }

    @GetMapping(value = "/{groupId:\\d+}/posts", produces = APPLICATION_JSON_VALUE)
    public TeacherGroupInfo getGroupsPostInfo(@PathVariable Integer groupId, UsernamePasswordAuthenticationToken token) {
        Integer userId = userService.getIdCurrentUser();
        String role = userService.getCurrentUserRole(token);
        if (role.equals("teacher")) {
            return groupService.getGroupPostsForTeacher(groupId, userId);
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "role must be teacher");
    }
}
