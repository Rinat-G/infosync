package ru.urfu.infosync.model;

import lombok.Value;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Value
public class UserJs {

    @NotBlank
    @Size(min = 2, max = 100)
    String firstName;

    @NotBlank
    @Size(min = 2, max = 100)
    String lastName;

    @Size(min = 2, max = 100)
    String patronymic;

    @Email
    @NotBlank
    @Size(max = 100)
    String email;

    @NotBlank
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$",
            message = "Password must be at least 8 characters long and must contain upper and lower case letters"
    )
    String password;

    @Size(min = 2, max = 100)
    String group;

    @NotBlank
    @Pattern(regexp = "^(student|teacher)$" ,message = "The role can only be \"student\" or \"teacher\" ")
    String role;
}
