package com.example.studdybuddy.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.example.studdybuddy.demo.models.Task;
import com.example.studdybuddy.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("tasks", taskService.getAllTasks());
        return "index"; // This returns the index.html template
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public void addTask(@RequestBody String[] taskData) {
        taskService.addTask(taskData);
    }
}
