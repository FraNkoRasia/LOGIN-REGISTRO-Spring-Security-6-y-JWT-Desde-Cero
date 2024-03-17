package com.spring.App.controller;

import com.spring.App.entity.User;
import com.spring.App.repository.UserRepository;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository; // Suponiendo que tienes un repositorio para gestionar los usuarios

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping("/{userId}/password")
    public void changePassword(@PathVariable Long userId, @RequestBody Map<String, String> passwordMap) {
        String newPassword = passwordMap.get("newPassword");

        // Cifrar la nueva contraseña
        String encodedPassword = passwordEncoder.encode(newPassword);

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @PutMapping("/{userId}/modifyProfile")
    public void updateUserDetails(@PathVariable Long userId, @RequestBody Map<String, String> userDetailsMap) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String currentPassword = userDetailsMap.get("currentPassword");

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Contraseña actual incorrecta");
        }

        // Actualizar solo los campos proporcionados en la solicitud
        if (userDetailsMap.containsKey("name") && !userDetailsMap.get("name").isEmpty()) {
            user.setName(userDetailsMap.get("name"));
        }
        if (userDetailsMap.containsKey("lastname") && !userDetailsMap.get("lastname").isEmpty()) {
            user.setLastname(userDetailsMap.get("lastname"));
        }
        if (userDetailsMap.containsKey("username") && !userDetailsMap.get("username").isEmpty()) {
            user.setUsername(userDetailsMap.get("username"));
        }
        if (userDetailsMap.containsKey("phone") && !userDetailsMap.get("phone").isEmpty()) {
            user.setPhone(userDetailsMap.get("phone"));
        }
        if (userDetailsMap.containsKey("passport") && !userDetailsMap.get("passport").isEmpty()) {
            user.setPassport(userDetailsMap.get("passport"));
        }

        userRepository.save(user);
    }

}
