package com.spring.App;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}

        
//        //METODO PARA CREAR UNA CLAVE Y CODIFICARLA
//        @Autowired
//        private PasswordEncoder passwordEncoder;
//        
//        @Bean
//        public CommandLineRunner createPasswordsCommand(){
//            return args ->{
//                System.out.println(passwordEncoder.encode("clave123"));
//                System.out.println(passwordEncoder.encode("clave456"));
//            };
//        }
}
