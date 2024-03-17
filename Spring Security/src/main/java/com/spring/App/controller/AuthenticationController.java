package com.spring.App.controller;

import com.spring.App.dto.AuthenticationRequest;
import com.spring.App.dto.AuthenticationResponse;
import com.spring.App.entity.ResetToken;
import com.spring.App.entity.User;
import com.spring.App.repository.ResetTokenRepository;
import com.spring.App.repository.UserRepository;
import com.spring.App.service.AuthenticationService;
import jakarta.validation.Valid;
import java.util.HashMap;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 *
 * @author FraNko
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController implements WebMvcConfigurer {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //HABILITO EL CORS PARA INGRESAR AL BACKEND DESDE EL FRONTEND
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Permitir solicitudes desde el origen http://localhost:5173
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Permitir los métodos GET, POST, PUT y DELETE
                .allowedHeaders("*"); // Permitir todas las cabeceras en la solicitud
    }
    //////////////////////////////////////////////////////////////

    @PreAuthorize("permitAll")
    @GetMapping("/authenticate")
    public ResponseEntity<Map<String, String>> getLoginForm() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Formulario de login disponible");
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("permitAll")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(//AuthenticationResponse se crea en el paquete DTO (DATA TRANSFER Objects ), adentro va a estar un JWT (JSON WEB TOKEN)
            @RequestBody @Valid AuthenticationRequest authRequest) {//AuthenticationRequest creado en el DTO
        AuthenticationResponse jwtDto = authenticationService.login(authRequest);
        return ResponseEntity.ok(jwtDto);

    }

    @PreAuthorize("permitAll")
    @GetMapping("/public-access") //este es solo de prueba
    public String publicAccessEndpoint() {
        return "este endpoint es publico";
    }

    // Cambiar la contraseña del usuario utilizando el token de restablecimiento
    @PreAuthorize("permitAll")
    @PostMapping("/reset-password/{token}")
    public ResponseEntity<String> resetPassword(@PathVariable String token, @RequestBody Map<String, String> requestBody) {
        // Verificar si el token es válido
        ResetToken resetTokenEntity = resetTokenRepository.findByToken(token);
        if (resetTokenEntity != null) {
            // Obtener el correo electrónico asociado con el token
            User user = userRepository.findByEmail(resetTokenEntity.getUserEmail());

            String password = requestBody.get("password");
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            // Aquí puedes implementar la lógica para cambiar la contraseña del usuario utilizando el correo electrónico
            // ...
            // Eliminar el token de la base de datos después de utilizarlo
            resetTokenRepository.delete(resetTokenEntity);

            return ResponseEntity.ok("La contraseña se ha restablecido correctamente.");
        } else {
            return ResponseEntity.badRequest().body("El token de restablecimiento de contraseña no es válido.");
        }
    }

    // Generar un token único para el restablecimiento de contraseña y persistirlo en la base de datos
    private String generateResetToken(String email) {
        // Generar un token único para el restablecimiento de contraseña
        String resetToken = UUID.randomUUID().toString();
        
        // System.out.println("ESTE ES EL TOKEN QUE LLEGO Al EMAIL QUE LO SOLICITO: " + resetToken);

        // Persistir el token en la base de datos junto con el correo electrónico del usuario
        resetTokenRepository.save(new ResetToken(resetToken, email));

        return resetToken;
    }

    @PreAuthorize("permitAll")
    @PostMapping("/forgot-password")

    public ResponseEntity<String> sendResetPassword(@RequestBody Map<String, String> requestBody) {
        // Obtener el correo electrónico del cuerpo de la solicitud
        String email = requestBody.get("email");

        // Verificar si el correo electrónico no es nulo
        if (email != null) {
            // Aquí puedes implementar la lógica para generar un token de restablecimiento de contraseña
            String resetToken = generateResetToken(email);

            // Aquí deberías implementar la lógica para enviar un correo electrónico con el token de restablecimiento
            sendResetEmail(email, resetToken);

            // Devuelve una respuesta exitosa al cliente
            return ResponseEntity.ok("Se ha enviado un correo electrónico de restablecimiento de contraseña a tu dirección de correo electrónico.");
        } else {
            // Manejar el caso cuando el correo electrónico es nulo
            return ResponseEntity.badRequest().body("No se proporcionó un correo electrónico válido.");
        }
    }

    
    private void sendResetEmail(String email, String resetToken) {
        // Configurar las propiedades del servidor de correo electrónico
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); // Reemplaza smtp.example.com con tu servidor de correo saliente
        props.put("mail.smtp.port", "587"); // Puerto SMTP estándar

        // Credenciales de autenticación del correo electrónico
        String username = "soportederecuperacionweb@gmail.com"; // Reemplaza tu_correo@example.com con tu dirección de correo electrónico
        String password = "kaexivnhgzzxbyjo"; // Reemplaza tu_contraseña con tu contraseña

        // Crear una sesión de correo electrónico con autenticación
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Crear un mensaje de correo electrónico
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username)); // Dirección de correo electrónico del remitente
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email)); // Dirección de correo electrónico del destinatario
            message.setSubject("Restablecimiento de contraseña"); // Asunto del correo electrónico
            String resetLink = "http://localhost:5173/auth/reset-password?token=" + resetToken;
            message.setText("Hola,\n\nHas solicitado un restablecimiento de contraseña. Haz clic en el siguiente enlace para restablecer tu contraseña: " + resetLink);

            // Enviar el mensaje de correo electrónico
            Transport.send(message);

            System.out.println("Correo electrónico de restablecimiento de contraseña enviado a " + email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}
