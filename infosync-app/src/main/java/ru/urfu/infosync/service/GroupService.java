package ru.urfu.infosync.service;

import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.GroupDao;
import ru.urfu.infosync.dao.PostDao;
import ru.urfu.infosync.dao.UserDao;
import ru.urfu.infosync.model.GeneralPost;
import ru.urfu.infosync.model.Group;
import ru.urfu.infosync.model.PostStatus;
import ru.urfu.infosync.model.User;
import ru.urfu.infosync.dao.PostStatusDao;

import java.util.HashMap;
import java.util.List;

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

    public HashMap<User, HashMap<GeneralPost, PostStatus>> getGroupInfoForTeacher(Integer groupId, Integer teacherId) {

        var posts = postDao.getTeacherPostsForGroup(groupId, teacherId);
        if(posts.size() == 0) return null;

        var students = userDao.getUsersByGroupId(groupId);
        var result = new HashMap<User, HashMap<GeneralPost, PostStatus>>();
        for (User student : students) {
            for (GeneralPost post : posts) {
                var status =
                        postStatusDao.getPostStatus(student.getId(), post.getId());
                if (!result.containsKey(student)) {
                    result.put(student, new HashMap<>());
                }
                result.get(student).put(post, status);
            }
        }

        return result;
    }

    /**
     *
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
