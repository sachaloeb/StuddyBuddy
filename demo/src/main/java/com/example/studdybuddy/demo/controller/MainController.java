package com.example.studdybuddy.demo.controller;

import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.util.Date;

import com.example.studdybuddy.demo.models.Task;
import com.example.studdybuddy.demo.service.TaskService;


public class MainController {
    @FXML
    private TextField taskNameField;
    @FXML
    private DatePicker dueDatePicker;
    @FXML
    private ComboBox<String> taskTypeComboBox;
    @FXML
    private Button addTaskButton;
    @FXML
    private ListView<String> taskListView;

    private TaskService taskService;

    @FXML
    public void initialize() {
        taskTypeComboBox.getItems().addAll("Assignment", "Exam", "Personal Study");
        addTaskButton.setOnAction(event -> addTask());
    }

    private void addTask() {
        String taskName = taskNameField.getText();
        String taskType = taskTypeComboBox.getValue();
        // Assume dueDatePicker returns a LocalDate
        Date dueDate = java.sql.Date.valueOf(dueDatePicker.getValue());

        Task newTask = new Task();
        newTask.setTaskName(taskName);
        newTask.setTaskType(taskType);
        newTask.setDueDate(dueDate);
        taskService.addTask(newTask);

        taskListView.getItems().add(taskName + " - " + taskType);
    }
}
