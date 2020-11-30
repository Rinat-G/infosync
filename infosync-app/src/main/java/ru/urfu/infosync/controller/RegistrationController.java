package ru.urfu.infosync.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.urfu.infosync.model.UserJs;
import ru.urfu.infosync.service.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/registration", produces = APPLICATION_JSON_VALUE)
public class RegistrationController {

    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<List<String>> registration(@Valid @RequestBody final UserJs userJs) {

        var result = userService.registerNewUser(userJs);
        if (result.getStatus()) {
            return ResponseEntity.ok(List.of(result.getMessage()));
        }
        return ResponseEntity.badRequest().body(List.of(result.getMessage()));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleValidationExceptions(MethodArgumentNotValidException ex) {

        var errors = ex.getBindingResult().getAllErrors().stream().map(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            return fieldName + ": " + errorMessage;
        }).collect(toList());
        return ResponseEntity.badRequest().contentType(APPLICATION_JSON_UTF8).body(errors);
    }
}
