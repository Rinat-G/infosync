package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.dao.PostStatusDao;
import ru.urfu.infosync.model.TeacherGroupInfo;

@Service
public class GroupService {

    private final GroupDao groupDao;
    private final PostStatusDao postStatusDao;

    public GroupService(GroupDao groupDao, PostStatusDao postStatusDao) {

        this.groupDao = groupDao;
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

    public TeacherGroupInfo getGroupPostsForTeacher(Integer groupId, Integer teacherId) {
        return postStatusDao.getPostsAndStatusesFromGroup(groupId, teacherId);
    }
}
