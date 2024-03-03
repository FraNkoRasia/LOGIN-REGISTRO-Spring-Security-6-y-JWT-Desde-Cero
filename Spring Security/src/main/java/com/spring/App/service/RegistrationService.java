package com.spring.App.service;

import com.spring.App.entity.User;
import com.spring.App.repository.UserRepository;
import com.spring.App.util.Role;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author FraNko
 */
@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User request) {
        // Verificar si el correo electrónico ya está en uso
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("El correo electrónico ya está en uso");
        }
        
        // Encriptar la contraseña antes de guardarla
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        request.setPassword(encryptedPassword);

        // Asignar el rol CUSTOMER al usuario
        request.setRole(Role.CUSTOMER);

        // Guardar el usuario en la base de datos
        userRepository.save(request);
    }
}
