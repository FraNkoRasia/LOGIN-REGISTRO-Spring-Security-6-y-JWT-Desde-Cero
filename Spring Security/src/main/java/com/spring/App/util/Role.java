package com.spring.App.util;

import java.util.Arrays;
import java.util.List;

/**
 *
 * @author FraNko
 */
public enum Role {
    
    CUSTOMER(Arrays.asList(Permission.READ_ALL_PRODUCTS)), ADMINISTRATOR(Arrays.asList(Permission.READ_ALL_PRODUCTS));
    
    //SAVE_ONE_PRODUCT Guardar
    //READ_ALL_PRODUCTS leer
    
    private List<Permission> permissions;

    
    private Role(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }
    
    
}
