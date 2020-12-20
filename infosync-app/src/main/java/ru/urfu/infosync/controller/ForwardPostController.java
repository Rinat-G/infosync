package ru.urfu.infosync.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.infosync.model.HabrPostToForward;
import ru.urfu.infosync.service.ForwardPostService;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/forward", produces = APPLICATION_JSON_VALUE)
public class ForwardPostController {


    private final ForwardPostService postService;

    public ForwardPostController(final ForwardPostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<String> forwardToGroup(
            @RequestBody final HabrPostToForward postToForward,
            final UsernamePasswordAuthenticationToken token
    ) {
        var authoritiesString = token.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(toList());
        if (!authoritiesString.contains("teacher")) {
            return ResponseEntity.badRequest().body("Your role must be \"teacher\" to perform this operation");
        }

        try {
            postService.doForward(postToForward, token.getName());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }

        return ResponseEntity.ok("Success");
    }
}
