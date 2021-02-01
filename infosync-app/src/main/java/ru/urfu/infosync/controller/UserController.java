package ru.urfu.infosync.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.infosync.model.UserInfo;
import ru.urfu.infosync.service.UserService;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/user", produces = APPLICATION_JSON_VALUE)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/role")
    public String getUserRole(UsernamePasswordAuthenticationToken token) {
        return userService.getCurrentUserRole(token);
    }

    @GetMapping(value = "/info")
    public UserInfo getUserInfo() {
        return userService.getUserInfo();
    }
}
