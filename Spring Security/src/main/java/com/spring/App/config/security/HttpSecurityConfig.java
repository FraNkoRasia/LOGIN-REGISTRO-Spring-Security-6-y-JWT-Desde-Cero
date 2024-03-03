package com.spring.App.config.security;

import com.spring.App.config.security.filter.JwtAuthenticationFilter;
import com.spring.App.util.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


/**
 *
 * @author FraNko
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class HttpSecurityConfig {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrfConfig -> csrfConfig.disable()) //deshabilitamos por que vamos a usar jwt
                .sessionManagement(sessionMangConfig -> sessionMangConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))//la session no tendra estado y sera autonoma (STATELESS ocupa menos memoria ram y es mas eficiente)
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    
    //A CONTINUACION AUTORIZACIONES SEGUN SU ROL

    //ENDPOINTS PUBLICOS
    private static Customizer<AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry> builderRequestMatchers() {
        return authConfig -> {
            authConfig.requestMatchers(HttpMethod.GET, "/auth/authenticate").permitAll();
            authConfig.requestMatchers(HttpMethod.POST, "/auth/authenticate").permitAll();  //direccion del login
            authConfig.requestMatchers(HttpMethod.GET, "/auth/public-access").permitAll();
            authConfig.requestMatchers("/error").permitAll(); //existe y esta por default en springsecurity

            //ENDPOINTS PRIVADOS
            authConfig.requestMatchers(HttpMethod.GET, "/products").hasAuthority(Permission.READ_ALL_PRODUCTS.name()); //es para aquellos que tiene permiso de leer todos los productos
            authConfig.requestMatchers(HttpMethod.POST, "/products").hasAuthority(Permission.SAVE_ONE_PRODUCT.name()); //es para aquellos roles que tienen el permiso de guardar el producto

            //A CONTINUACION SE DENIEGA EL ACCESO A LOS ENPOINTS QUE NO ESTE INCLUIDO
            authConfig.anyRequest().denyAll(); //cualquiera PETICION que no este incluida ya sea publica o privada o que se me alla olvidado poner, va a denegar el acceso;
        };

    }
}
