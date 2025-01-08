package com.example.studdybuddy.demo.repository;

import com.example.studdybuddy.demo.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByUserUserId(Long userId);
    public Task save(Task task);

    public void deleteById(Long id);
}
