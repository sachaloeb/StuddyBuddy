package com.example.studdybuddy.demo.repository;

import com.example.studdybuddy.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
