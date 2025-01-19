document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const introButton = document.getElementById("introButton");
    const closeModal = document.getElementById("closeModal");

    // Show the modal when the button is clicked
    introButton.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Hide the modal when the close button is clicked
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Hide the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Placeholder for future features
    setupTaskTracking();
    setupStudyRecommendations();

    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        customButtons: {
            prev: {
                text: 'Prev',
                click: function() {
                    calendar.prev();
                }
            },
            next: {
                text: 'Next',
                click: function() {
                    calendar.next();
                }
            }
        },
        themeSystem: 'bootstrap'
    });
    calendar.render();

    // Add event listener for adding a new task
    document.getElementById("addTaskButton").addEventListener("click", () => addTask(calendar));

    // Load tasks from local storage and display them
    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.innerHTML = `
            <h3>${task.name}</h3>
            <p>Start: ${new Date(task.start).toLocaleString()}</p>
            <p>End: ${new Date(task.end).toLocaleString()}</p>
            <p>Priority: ${task.priority}</p>
            <label>
                <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''}> Done
            </label>
            <div class="task-buttons">
                <button class="edit-task-button">Edit</button>
                <button class="delete-task-button">Delete</button>
            </div>
        `;
        document.getElementById("tasks").appendChild(taskCard);

        const calendarEvent = calendar.addEvent({
            title: task.name,
            start: task.start,
            end: task.end
        });

        taskCard.querySelector(".task-complete-checkbox").addEventListener("change", (event) => {
            task.completed = event.target.checked;
            saveTasksToLocalStorage(tasks);
            if (event.target.checked) {
                taskCard.style.textDecoration = "line-through";
            } else {
                taskCard.style.textDecoration = "none";
            }
        });

        taskCard.querySelector(".edit-task-button").addEventListener("click", () => {
            const taskName = taskCard.querySelector("h3").textContent;
            const startDateTimeText = taskCard.querySelector("p:nth-of-type(1)").textContent.split('Start: ')[1];
            const endDateTimeText = taskCard.querySelector("p:nth-of-type(2)").textContent.split('End: ')[1];
            const taskPriority = taskCard.querySelector("p:nth-of-type(3)").textContent.split('Priority: ')[1];

            const startDateTime = moment(startDateTimeText, "DD/MM/YYYY, HH:mm:ss").toDate();
            const endDateTime = moment(endDateTimeText, "DD/MM/YYYY, HH:mm:ss").toDate();

            if (!isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime())) {
                showEditForm(taskCard, taskName, startDateTime, endDateTime, taskPriority, calendarEvent);
            } else {
                alert("Invalid date or time format. Please try again.");
            }
        });

        taskCard.querySelector(".delete-task-button").addEventListener("click", () => {
            showCustomPrompt("Are you sure you want to delete this task? Type 'yes' to confirm:", (response) => {
                if (response && response.toLowerCase() === 'yes') {
                    taskCard.remove();
                    calendarEvent.remove();
                    tasks = tasks.filter(t => t.id !== task.id);
                    saveTasksToLocalStorage(tasks);
                }
            });
        });
    });
});

function setupTaskTracking() {
    console.log("Task tracking placeholder initialized.");
    // Future: Add dynamic task handling here
}

function setupStudyRecommendations() {
    console.log("Study recommendations placeholder initialized.");
    // Future: Add recommendation algorithms here
}

function generateTimetable() {
    console.log("Generating study timetable...");
    // Example: Add logic to populate the timetable with study sessions
}

// Function to save tasks to local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Initialize tasks array
let tasks = loadTasksFromLocalStorage();

// Function to add a task to the DOM
function addTaskToDOM(task, calendar) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    console.log("Task ID:", task.id);
    taskCard.dataset.taskId = task.id; // Set the task ID
    taskCard.innerHTML = `
        <h3>${task.name}</h3>
        <p>Start: ${new Date(task.start).toLocaleString()}</p>
        <p>End: ${new Date(task.end).toLocaleString()}</p>
        <p>Priority: ${task.priority}</p>
        <label>
            <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''}> Done
        </label>
        <div class="task-buttons">
            <button class="edit-task-button">Edit</button>
            <button class="delete-task-button">Delete</button>
        </div>
    `;
    document.getElementById("tasks").appendChild(taskCard);

    const calendarEvent = calendar.addEvent({
        title: task.name,
        start: task.start,
        end: task.end
    });

    taskCard.querySelector(".task-complete-checkbox").addEventListener("change", (event) => {
        task.completed = event.target.checked;
        saveTasksToLocalStorage(tasks);
        if (event.target.checked) {
            taskCard.style.textDecoration = "line-through";
        } else {
            taskCard.style.textDecoration = "none";
        }
    });

    taskCard.querySelector(".edit-task-button").addEventListener("click", () => {
        const taskName = taskCard.querySelector("h3").textContent;
        const startDateTimeText = taskCard.querySelector("p:nth-of-type(1)").textContent.split('Start: ')[1];
        const endDateTimeText = taskCard.querySelector("p:nth-of-type(2)").textContent.split('End: ')[1];
        const taskPriority = taskCard.querySelector("p:nth-of-type(3)").textContent.split('Priority: ')[1];

        const startDateTime = moment(startDateTimeText, "DD/MM/YYYY, HH:mm:ss").toDate();
        const endDateTime = moment(endDateTimeText, "DD/MM/YYYY, HH:mm:ss").toDate();

        if (!isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime())) {
            showEditForm(taskCard, taskName, startDateTime, endDateTime, taskPriority, calendarEvent);
        } else {
            alert("Invalid date or time format. Please try again.");
        }
    });

    taskCard.querySelector(".delete-task-button").addEventListener("click", () => {
        showCustomPrompt("Are you sure you want to delete this task? Type 'yes' to confirm:", (response) => {
            if (response && response.toLowerCase() === 'yes') {
                taskCard.remove();
                calendarEvent.remove();
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasksToLocalStorage(tasks);
            }
        });
    });
}

function validateTaskInputs(taskName, startDateTime, endDateTime) {
    if (!taskName || taskName.trim() === "") {
        alert("Task Name cannot be empty. Please enter a valid name.");
        return false;
    }

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        alert("Invalid date or time format. Please ensure all fields are correctly filled.");
        return false;
    }

    if (endDateTime <= startDateTime) {
        alert("End time must be later than start time. Please adjust your inputs.");
        return false;
    }

    return true;
}

function addTask(calendar) {
    const formContent = `
        <form id="addTaskForm">
            <label for="taskName">Task Name:</label>
            <input type="text" id="taskName" name="taskName" required>
            <label for="startDate">Start Date (YYYY-MM-DD):</label>
            <input type="date" id="startDate" name="startDate" required>
            <label for="startTime">Start Time (HH:MM):</label>
            <input type="time" id="startTime" name="startTime" required>
            <label for="endDate">End Date (YYYY-MM-DD):</label>
            <input type="date" id="endDate" name="endDate" required>
            <label for="endTime">End Time (HH:MM):</label>
            <input type="time" id="endTime" name="endTime" required>
            <label for="taskPriority">Priority:</label>
            <select id="taskPriority" name="taskPriority" required>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </form>
    `;

    showCustomPrompt("Add Task", (formData) => {
        try {
            if (formData) {
                const taskName = formData.get('taskName');
                const startDate = formData.get('startDate');
                const startTime = formData.get('startTime');
                const endDate = formData.get('endDate');
                const endTime = formData.get('endTime');
                const taskPriority = formData.get('taskPriority');

                const startDateTime = new Date(`${startDate}T${startTime}`);
                const endDateTime = new Date(`${endDate}T${endTime}`);

                if (!validateTaskInputs(taskName, startDateTime, endDateTime)) {
                    return; // Exit if validation fails
                }

                const task = {
                    id: Date.now().toString(),
                    name: taskName,
                    start: startDateTime.toISOString(),
                    end: endDateTime.toISOString(),
                    priority: taskPriority,
                    completed: false
                };

                tasks.push(task);
                saveTasksToLocalStorage(tasks);
                addTaskToDOM(task, calendar);
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("An unexpected error occurred while adding the task. Please try again.");
        }
    }, true, formContent);
}

function showEditForm(taskCard, taskName, startDateTime, endDateTime, taskPriority, calendarEvent) {
    const formContent = `
        <form id="editTaskForm">
            <label for="editTaskName">Task Name:</label>
            <input type="text" id="editTaskName" name="taskName" value="${taskName}">
            <label for="editTaskStartDate">Start Date (YYYY-MM-DD):</label>
            <input type="date" id="editTaskStartDate" name="taskStartDate" value="${startDateTime.toISOString().split('T')[0]}">
            <label for="editTaskStartTime">Start Time (HH:MM):</label>
            <input type="time" id="editTaskStartTime" name="taskStartTime" value="${startDateTime.toTimeString().split(' ')[0].substring(0, 5)}">
            <label for="editTaskEndDate">End Date (YYYY-MM-DD):</label>
            <input type="date" id="editTaskEndDate" name="taskEndDate" value="${endDateTime.toISOString().split('T')[0]}">
            <label for="editTaskEndTime">End Time (HH:MM):</label>
            <input type="time" id="editTaskEndTime" name="taskEndTime" value="${endDateTime.toTimeString().split(' ')[0].substring(0, 5)}">
            <label for="editTaskPriority">Priority:</label>
            <select id="editTaskPriority" name="taskPriority">
                <option value="High" ${taskPriority === 'High' ? 'selected' : ''}>High</option>
                <option value="Medium" ${taskPriority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Low" ${taskPriority === 'Low' ? 'selected' : ''}>Low</option>
            </select>
        </form>
    `;

    showCustomPrompt("Edit Task", (formData) => {
        if (formData) {
            const newTaskName = formData.get('taskName');
            const newTaskStartDate = formData.get('taskStartDate');
            const newTaskStartTime = formData.get('taskStartTime');
            const newTaskEndDate = formData.get('taskEndDate');
            const newTaskEndTime = formData.get('taskEndTime');
            const newTaskPriority = formData.get('taskPriority');

            const newStartDateTime = new Date(`${newTaskStartDate}T${newTaskStartTime}`);
            const newEndDateTime = new Date(`${newTaskEndDate}T${newTaskEndTime}`);

            if (!isNaN(newStartDateTime.getTime()) && !isNaN(newEndDateTime.getTime())) {
                taskCard.querySelector("h3").textContent = newTaskName;
                taskCard.querySelector("p:nth-of-type(1)").textContent = `Start: ${newStartDateTime.toLocaleString()}`;
                taskCard.querySelector("p:nth-of-type(2)").textContent = `End: ${newEndDateTime.toLocaleString()}`;
                taskCard.querySelector("p:nth-of-type(3)").textContent = `Priority: ${newTaskPriority}`;

                calendarEvent.setProp('title', newTaskName);
                calendarEvent.setStart(newStartDateTime.toISOString());
                calendarEvent.setEnd(newEndDateTime.toISOString());

                // Find the task in the tasks array and update it
                const taskIndex = tasks.findIndex(t => t.id === taskCard.dataset.taskId);
                if (taskIndex !== -1) {
                    tasks[taskIndex].name = newTaskName;
                    tasks[taskIndex].start = newStartDateTime.toISOString();
                    tasks[taskIndex].end = newEndDateTime.toISOString();
                    tasks[taskIndex].priority = newTaskPriority;
                    saveTasksToLocalStorage(tasks); // Save changes to local storage
                } else {
                    alert("An unexpected error occurred while updating the task. Please try again.");
                }
            } else {
                alert("Invalid date or time format. Please try again.");
            }
        }
    }, true, formContent);
}




function displayTasks(tasks) {
    const taskTable = document.createElement('table');
    taskTable.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
            </tr>
        </thead>
        <tbody>
            ${tasks.map(task => `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>
                        <label>
                            <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''}> Done
                        </label>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    document.getElementById('tasks').appendChild(taskTable);

    // Add event listeners to the checkboxes
    taskTable.querySelectorAll(".task-complete-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", (event) => {
            const row = event.target.closest("tr");
            if (event.target.checked) {
                row.style.textDecoration = "line-through";
            } else {
                row.style.textDecoration = "none";
            }
        });
    });
}

// // Fetch tasks from JSONPlaceholder and display them in a table
// async function fetchTasks() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//         const tasks = await response.json();
//         displayTasks(tasks);
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//     }
// }
//
// function displayTasks(tasks) {
//     const taskTable = document.createElement('table');
//     taskTable.innerHTML = `
//         <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Completed</th>
//             </tr>
//         </thead>
//         <tbody>
//             ${tasks.map(task => `
//                 <tr>
//                     <td>${task.id}</td>
//                     <td>${task.title}</td>
//                     <td>${task.completed ? 'Yes' : 'No'}</td>
//                 </tr>
//             `).join('')}
//         </tbody>
//     `;
//     document.getElementById('tasks').appendChild(taskTable);
// }

// Add a welcome message dynamically
const welcomeMessage = document.getElementById("welcomeMessage");
const userName = "Student"; // You can replace this with a user input later
welcomeMessage.innerHTML = `<h1>Welcome, ${userName}! Let's get started with StudyBuddy!</h1>`;
welcomeMessage.style.textAlign = "center";
welcomeMessage.style.marginTop = "20px";

const userNameKey = "studyBuddyUserName";

// Check if a name is already stored
const storedUserName = localStorage.getItem(userNameKey);
if (storedUserName) {
    displayWelcomeMessage(storedUserName);
} else {
    promptForUserName();
}

function promptForUserName() {
    showCustomPrompt("Welcome to StudyBuddy! Please enter your name:", (name) => {
        if (name) {
            localStorage.setItem(userNameKey, name);
            displayWelcomeMessage(name);
        }
    });
}

function displayWelcomeMessage(name) {
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.innerHTML = `<h1>Welcome, ${name}! Let's plan your studies.</h1>`;
    welcomeMessage.style.textAlign = "center";
}


function showCustomPrompt(message, callback, isForm = false, formContent = '') {
    const customPrompt = document.getElementById('customPrompt');
    const promptMessage = document.getElementById('promptMessage');
    const promptInput = document.getElementById('promptInput');
    const formContainer = document.getElementById('formContainer');
    const promptOk = document.getElementById('promptOk');
    const promptCancel = document.getElementById('promptCancel');
    const closePrompt = document.getElementById('closePrompt');

    promptMessage.textContent = message;
    promptInput.value = '';
    promptInput.style.display = isForm ? 'none' : 'block';
    formContainer.innerHTML = isForm ? formContent : '';

    customPrompt.style.display = 'flex';

    function closePromptModal() {
        customPrompt.style.display = 'none';
        promptOk.removeEventListener('click', onOk);
        promptCancel.removeEventListener('click', onCancel);
        closePrompt.removeEventListener('click', closePromptModal);
    }

    function onOk() {
        const formData = isForm ? new FormData(customPrompt.querySelector('form')) : promptInput.value;
        closePromptModal();
        callback(formData);
    }

    function onCancel() {
        closePromptModal();
        callback(null);
    }

    promptOk.addEventListener('click', onOk);
    promptCancel.addEventListener('click', onCancel);
    closePrompt.addEventListener('click', closePromptModal);
}