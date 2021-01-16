package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.dao.PostDao;
import ru.urfu.infosync.dao.PostStatusDao;
import ru.urfu.infosync.model.Group;
import ru.urfu.infosync.model.TeacherGroupInfo;

import java.util.List;

@Service
public class GroupService {

    private final GroupDao groupDao;
    private final PostDao postDao;
    private final PostStatusDao postStatusDao;

    public GroupService(GroupDao groupDao, PostDao postDao, PostStatusDao postStatusDao) {

        this.groupDao = groupDao;
        this.postDao = postDao;
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

    /**
     * @return List of groups which the teacher recommended posts
     */
    public List<Group> getGroupsRecommendedByTeacher(Integer teacherId) {

        System.out.println("GroupService.getGroupsRecommendedByTeacher");
        var x = postDao.getGroupsWithPostByTeacher(teacherId);
        System.out.println(x);
        System.out.println(groupDao.getGroupsNamesByIndexes(x));

        return groupDao.getGroupsNamesByIndexes(postDao.getGroupsWithPostByTeacher(teacherId));
    }
}
