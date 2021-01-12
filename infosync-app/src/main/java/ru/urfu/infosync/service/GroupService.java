package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.dao.PostDao;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.*;
import ru.urfu.infosync.dao.PostStatusDao;

import java.util.HashMap;
import java.util.Objects;

@Service
public class GroupService {

    private final GroupDao groupDao;
    private final PostDao postDao;
    private final UserDao userDao;
    private final PostStatusDao postStatusDao;

    public GroupService(GroupDao groupDao, PostDao postDao, UserDao userDao, PostStatusDao postStatusDao) {

        this.groupDao = groupDao;
        this.postDao = postDao;
        this.userDao = userDao;
        this.postStatusDao = postStatusDao;
    }

    public Integer createGroupOrGetId(String groupName) {
        if (groupName == null) {
            return null;
        }

        var existGroup = groupDao.getGroupByName(groupName);

        if (existGroup == null) {
            return groupDao.saveNewGroup(groupName).getId();
        }

        return existGroup.getId();
    }

    @Transactional
    public TeacherGroupInfo getGroupInfoForTeacher(Integer groupId, Integer teacherId) {

        var groupPostStatuses = postDao.getTeacherPostsForGroup(groupId, teacherId);
        if(groupPostStatuses.size() == 0) return null;

        var info = new TeacherGroupInfo(groupId, teacherId, groupPostStatuses);
        var students = userDao.getUsersByGroupId(groupId);

        postStatusDao.setPostStatusesForTeacher(info, students);
        return info;
    }
}
