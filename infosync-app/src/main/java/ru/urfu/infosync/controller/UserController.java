package ru.urfu.infosync.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/user", produces = APPLICATION_JSON_VALUE)
public class UserController {


    @GetMapping(value = "/role")
    public String getUserRole(UsernamePasswordAuthenticationToken token) {
        var authorities = new ArrayList<>(token.getAuthorities());
        if (authorities.size() != 0) {
            return authorities.get(0).getAuthority();
        }
        return null;
    }
}
