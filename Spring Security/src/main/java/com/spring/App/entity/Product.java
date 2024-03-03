package com.spring.App.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import java.math.BigDecimal;

/**
 *
 * @author FraNko
 */
@Entity
public class Product {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)//IDENTITI Este ID sera AUTOGENERADO
    @Null //Este ID tiene que ser NULL por que yo lo voy a estar AUTOGENERANDO
    private Long id;
    
    @NotBlank //para que el name no venga vacio
    private String name;
    
    @DecimalMin(value = "0.01")//Para que el valor minimo de este producto sea 0.01 centavos
    private BigDecimal price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    
}
