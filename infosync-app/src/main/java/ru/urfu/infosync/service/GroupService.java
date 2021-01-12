package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.dao.PostDao;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.*;
import ru.urfu.infosync.dao.PostStatusDao;

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

    public TeacherGroupInfo getGroupInfoForTeacher(Integer groupId, Integer teacherId) {

        var students = userDao.getUsersByGroupId(groupId);

        var groupPostStatuses = postDao.getTeacherPostsForGroup(groupId, teacherId, students);
        if(groupPostStatuses.size() == 0) return new TeacherGroupInfo(groupId, teacherId, null);

        var info = new TeacherGroupInfo(groupId, teacherId, groupPostStatuses);

        postStatusDao.setPostStatusesForTeacher(info, students);

        //put other students
        for (User user : students) {
            for (GroupPostWithStatuses postStatuses : info.getPostStatuses()) {
                var exist = postStatuses.getStatuses().stream()
                        .anyMatch(x -> x.getFullName().equals(user.getFullName()));
                if(!exist) postStatuses.getStatuses().add(new UserPostStatus(user.getFullName(), false));
            }
        }
        return info;
    }
}
