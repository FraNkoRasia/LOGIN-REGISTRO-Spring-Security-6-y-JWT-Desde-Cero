package com.spring.App.repository;

import com.spring.App.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByUsername(String username);

    public boolean existsByUsername(String username);
    
    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User findByEmail(@Param("username") String username);

//    @Query("SELECT u FROM User u WHERE u.resetToken = :resetToken")
//    Optional<User> findByResetToken(@Param("resetToken") String resetToken);
//   
}
