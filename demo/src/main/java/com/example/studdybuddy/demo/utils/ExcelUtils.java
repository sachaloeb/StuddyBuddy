package com.example.studdybuddy.demo.utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ExcelUtils {
    private static final String FILE_PATH = "src/main/resources/tasks.xlsx";

    // Read all tasks from Excel
    public static List<String[]> readTasks() {
        List<String[]> tasks = new ArrayList<>();
        try (FileInputStream fis = new FileInputStream(FILE_PATH);
            Workbook workbook = new XSSFWorkbook(fis)) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                String[] task = new String[row.getLastCellNum()];
                for (Cell cell : row) {
                    task[cell.getColumnIndex()] = cell.toString();
                }
                tasks.add(task);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return tasks;
    }

    // Write a new task to Excel
    public static void writeTask(String[] taskData) {
        try (FileInputStream fis = new FileInputStream(FILE_PATH);
            Workbook workbook = new XSSFWorkbook(fis)) {
            Sheet sheet = workbook.getSheetAt(0);
            int rowCount = sheet.getLastRowNum();
            Row newRow = sheet.createRow(rowCount + 1);
            for (int i = 0; i < taskData.length; i++) {
                Cell cell = newRow.createCell(i);
                cell.setCellValue(taskData[i]);
            }
            try (FileOutputStream fos = new FileOutputStream(FILE_PATH)) {
                workbook.write(fos);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
