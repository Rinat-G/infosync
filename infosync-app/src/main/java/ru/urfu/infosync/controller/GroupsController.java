package ru.urfu.infosync.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.model.Group;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/groups", produces = APPLICATION_JSON_VALUE)
public class GroupsController {

    private final GroupDao groupDao;

    public GroupsController(final GroupDao groupDao) {
        this.groupDao = groupDao;
    }

    @GetMapping
    public List<Group> getGroups() {
        return groupDao.getAllGroups();
    }
}
