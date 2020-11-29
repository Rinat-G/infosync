package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.GroupDao;

@Service
public class GroupService {

    private final GroupDao groupDao;

    public GroupService(GroupDao groupDao) {
        this.groupDao = groupDao;
    }

    public int createGroupOrGetId(String groupName) {
        var existGroup = groupDao.getGroupByName(groupName);

        if (existGroup == null) {
            return groupDao.saveNewGroup(groupName).getId();
        }

        return existGroup.getId();
    }
}
