package com.spring.App.repository;

import com.spring.App.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 *
 * @author FraNko
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
     @PreAuthorize("hasAuthority('SAVE_ONE_PRODUCT')")
    Product save(Product product);
}
