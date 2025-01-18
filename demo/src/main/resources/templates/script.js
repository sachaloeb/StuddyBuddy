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

    // Generate the study timetable
    generateTimetable();
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

const addTask = (calendar) => {
    showCustomPrompt("Enter task name:", (taskName) => {
        if (!taskName) return;

        showCustomPrompt("Enter due date (YYYY-MM-DD):", (taskDueDate) => {
            if (!taskDueDate) return;

            showCustomPrompt("Enter due time (HH:MM):", (taskDueTime) => {
                if (!taskDueTime) return;

                showCustomPrompt("Enter priority (High, Medium, Low):", (taskPriority) => {
                    if (!taskPriority) return;

                    const [hours, minutes] = taskDueTime.split(':').map(Number);
                    const taskDateTime = new Date(taskDueDate);
                    taskDateTime.setHours(hours, minutes, 0, 0);

                    if (isNaN(taskDateTime.getTime())) {
                        alert("Invalid date or time format. Please try again.");
                        return;
                    }

                    const taskCard = document.createElement("div");
                    taskCard.className = "task-card";
                    taskCard.innerHTML = `
                        <h3>${taskName}</h3>
                        <p>Due: ${taskDateTime.toLocaleString('en-US', { timeZone: 'UTC', hour12: false })}</p>
                        <p>Priority: ${taskPriority}</p>
                        <label>
                            <input type="checkbox" class="task-complete-checkbox" id="taskCheckBox"> Done
                        </label>
                        <div class="task-buttons">
                            <button class="edit-task-button">Edit</button>
                            <button class="delete-task-button">Delete</button>
                        </div>
                    `;
                    document.getElementById("tasks").appendChild(taskCard);

                    // Add the new task to the calendar and store the event ID
                    const calendarEvent = calendar.addEvent({
                        title: taskName,
                        start: taskDateTime.toISOString()
                    });

                    // Add event listener to the checkbox
                    taskCard.querySelector(".task-complete-checkbox").addEventListener("change", (event) => {
                        if (event.target.checked) {
                            taskCard.style.textDecoration = "line-through";
                        } else {
                            taskCard.style.textDecoration = "none";
                        }
                    });

                    // Add event listener to the edit button
                    taskCard.querySelector(".edit-task-button").addEventListener("click", () => {
                        const taskName = taskCard.querySelector("h3").textContent;
                        const taskDateTimeText = taskCard.querySelector("p:nth-of-type(1)").textContent.split('Due: ')[1];
                        const taskDateTime = new Date(taskDateTimeText);
                        const taskPriority = taskCard.querySelector("p:nth-of-type(2)").textContent.split('Priority: ')[1];

                        showEditForm(taskCard, taskName, taskDateTime, taskPriority, calendarEvent);
                    });

                    // Add event listener to the delete button
                    taskCard.querySelector(".delete-task-button").addEventListener("click", () => {
                        showCustomPrompt("Are you sure you want to delete this task? Type 'yes' to confirm:", (response) => {
                            if (response && response.toLowerCase() === 'yes') {
                                taskCard.remove();
                                calendarEvent.remove();
                            }
                        });
                    });
                });
            });
        });
    });
};

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

function showEditForm(taskCard, taskName, taskDateTime, taskPriority, calendarEvent) {
    const formContent = `
        <form id="editTaskForm">
            <label for="editTaskName">Task Name:</label>
            <input type="text" id="editTaskName" name="taskName" value="${taskName}">
            <label for="editTaskDueDate">Due Date (YYYY-MM-DD):</label>
            <input type="date" id="editTaskDueDate" name="taskDueDate" value="${taskDateTime.toISOString().split('T')[0]}">
            <label for="editTaskDueTime">Due Time (HH:MM):</label>
            <input type="time" id="editTaskDueTime" name="taskDueTime" value="${taskDateTime.toTimeString().split(' ')[0].substring(0, 5)}">
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
            const newTaskDueDate = formData.get('taskDueDate');
            const newTaskDueTime = formData.get('taskDueTime');
            const newTaskPriority = formData.get('taskPriority');

            const [hours, minutes] = newTaskDueTime.split(':').map(Number);
            const newTaskDateTime = new Date(newTaskDueDate);
            newTaskDateTime.setHours(hours, minutes, 0, 0);

            taskCard.querySelector("h3").textContent = newTaskName;
            taskCard.querySelector("p:nth-of-type(1)").textContent = `Due: ${newTaskDateTime.toLocaleString('en-US', { timeZone: 'UTC', hour12: false })}`;
            taskCard.querySelector("p:nth-of-type(2)").textContent = `Priority: ${newTaskPriority}`;

            // Update the calendar event
            calendarEvent.setProp('title', newTaskName);
            calendarEvent.setStart(newTaskDateTime.toISOString());
        }
    }, true, formContent);
}