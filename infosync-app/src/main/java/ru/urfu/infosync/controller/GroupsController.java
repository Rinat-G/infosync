package ru.urfu.infosync.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.model.GeneralPost;
import ru.urfu.infosync.model.Group;
import ru.urfu.infosync.model.PostStatus;
import ru.urfu.infosync.model.User;
import ru.urfu.infosync.service.UserService;
import ru.urfu.infosync.service.GroupService;

import java.util.HashMap;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/groups", produces = APPLICATION_JSON_VALUE)
public class GroupsController {

    private final GroupDao groupDao;
    private final UserService userService;
    private final GroupService groupService;

    public GroupsController(final GroupDao groupDao, final  UserService userService,
                            final GroupService groupService) {

        this.groupDao = groupDao;
        this.userService = userService;
        this.groupService = groupService;
    }

    @GetMapping
    public List<Group> getGroups() {
        return groupDao.getAllGroups();
    }

    @GetMapping(value = "/{groupId:\\d+}", produces = APPLICATION_JSON_VALUE)
    public HashMap<User, HashMap<GeneralPost, PostStatus>> getGroupsPostInfo(@PathVariable Integer groupId) {
        Integer userId = userService.getIdCurrentUser();
        String role = userService.getCurrentUserRole(userId);
        System.out.println("ROLE = " + role);
        if(role.equals("teacher")) {
            return groupService.getGroupInfoForTeacher(groupId, userId);
        }
        return null;
    }
}
