package com.example.studdybuddy.demo.service;

import com.example.studdybuddy.demo.models.Task;
import com.example.studdybuddy.demo.repository.TaskRepository;
import com.example.studdybuddy.demo.utils.ExcelUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserUserId(userId);
    }

    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    public List<String[]> getAllTasks() {
        return ExcelUtils.readTasks();
    }

    public void addTask(String[] taskData) {
        ExcelUtils.writeTask(taskData);
    }
}
