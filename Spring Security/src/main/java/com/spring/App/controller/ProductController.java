package com.spring.App.controller;

import com.spring.App.entity.Product;
import com.spring.App.repository.ProductRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author FraNko
 */
@RestController
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    @PreAuthorize("hasAuthority('READ_ALL_PRODUCTS')")
    @GetMapping
    public ResponseEntity<List<Product>> findAll(){ //devuelve una lista de productos
        List<Product> products = productRepository.findAll(); //busco en la base de datos los productos
        
        if (products != null && !products.isEmpty()) {
            return ResponseEntity.ok(products); // si la lista no esta vacia devuelvo un status ok
        }
        return ResponseEntity.notFound().build(); //pero si, si esta vacia devuelvo un notfound
    }
    
    @PostMapping
    public ResponseEntity<Product> createone(@RequestBody @Valid Product product){ //CON REQUEST BODY creo un JSON que va a ser mapeado a la entidad Product y hago que se validen las anotaciones de jakarta(@Null, @NotBlank y @DecimalMin)
        return ResponseEntity.status(HttpStatus.CREATED).body(// luego devuelve ResponEntity con el status CREATED
                productRepository.save(product));//ACA SE DEVERIA USAR EL SERVICIO
    }
      @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception exception, HttpServletRequest request){

        Map<String, String> apiError = new HashMap<>();
        apiError.put("message",exception.getLocalizedMessage());
        apiError.put("timestamp", new Date().toString());
        apiError.put("url", request.getRequestURL().toString());
        apiError.put("http-method", request.getMethod());

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        if(exception instanceof AccessDeniedException){
            status = HttpStatus.FORBIDDEN;
        }

        return ResponseEntity.status(status).body(apiError);
    }
}
