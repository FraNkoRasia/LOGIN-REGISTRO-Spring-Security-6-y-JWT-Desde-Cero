package com.spring.App.controller;

import com.spring.App.entity.User;
import com.spring.App.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author FraNko
 */
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;

    @PreAuthorize("permitAll")
    @PostMapping("/registro")
    public ResponseEntity<Void> registerUser(@RequestBody @Valid User newUser) {
        registrationService.registerUser(newUser);
        return ResponseEntity.ok().build();
    }
}

