package ru.urfu.infosync.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.urfu.infosync.dao.UserDao;

import java.util.List;

@Service
public class DataBaseUserDetailsService implements UserDetailsService {

    private final UserDao userDao;

    public DataBaseUserDetailsService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userDao.getUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        return new User(user.getEmail(), user.getPasswordHash(), List.of(new SimpleGrantedAuthority(user.getRole())));
    }
}
