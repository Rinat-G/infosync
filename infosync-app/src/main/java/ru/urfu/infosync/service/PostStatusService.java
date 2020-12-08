package ru.urfu.infosync.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.urfu.infosync.model.PostStatus;

@Service
public class PostStatusService {

    public void markAsRead (Integer post_id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
    }
}
