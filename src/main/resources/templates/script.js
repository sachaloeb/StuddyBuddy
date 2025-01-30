// Initialize tasks array from local storage
let tasks = [];
let calendar;
document.addEventListener("DOMContentLoaded", async () => {
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.style.textAlign = "center";
    welcomeMessage.style.marginTop = "20px";
    const userNameKey = "studyBuddyUserName";
    const storedUserName = localStorage.getItem(userNameKey);
    if (storedUserName) {
        displayWelcomeMessage(storedUserName);
    } else {
        promptForUserName();
    }

    const modal = document.getElementById("modal");
    const introButton = document.getElementById("introButton");
    const closeModal = document.getElementById("closeModal");

    introButton.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    setupTaskTracking();
    setupStudyRecommendations();

    const calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
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

    document.getElementById("addTaskButton").addEventListener("click", () => addTask(calendar));

    // Fetch tasks from the backend and display them
    tasks = await fetchTasks();
    const userTasks = tasks.filter(task => task.author === storedUserName);
    userTasks.forEach(task => addTaskToDOM(task, calendar));
});

function setupTaskTracking() {
    console.log("Task tracking placeholder initialized.");
    // Future: Add dynamic task handling here
}

function setupStudyRecommendations() {
    console.log("Study recommendations placeholder initialized.");
    // Future: Add recommendation algorithms here
}

// Fetch tasks from the backend
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3002/tasks');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return []; // Return an empty array on error
    }
}
async function saveTaskToServer(task) {
    try {
        const response = await fetch('http://localhost:3002/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to save task');
        }
        const savedTask = await response.json();
        addTaskToDOM(savedTask, calendar);
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

// Function to delete a task from the backend
async function deleteTaskFromServer(taskId) {
    try {
        const response = await fetch(`http://localhost:3002/tasks/${taskId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        console.log('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Function to update a task in the backend
async function editTaskOnServer(taskId, updatedTask) {
    console.log(taskId);
    try {
        const response = await fetch(`http://localhost:3002/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const updatedTaskFromServer = await response.json();
        console.log('Task updated successfully:', updatedTaskFromServer);
        return updatedTaskFromServer;
    } catch (error) {
        console.error('Error updating task:', error);
    }
}



// Function to add a task to the DOM
function addTaskToDOM(task, calendar) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.dataset.taskId = task.id;
    taskCard.innerHTML = `
        <h3>${task.name}</h3>
        <p>Start: ${new Date(task.startDate).toLocaleString()}</p>
        <p>End: ${new Date(task.dueDate).toLocaleString()}</p>
        <p>Priority: ${task.priority}</p>
        <label>
            <input type="checkbox" class="task-complete-checkbox" name="taskCheckBox" ${task.IsCompleted ? 'checked' : ''}> Done
        </label>
        <div class="task-buttons">
            <button class="edit-task-button">Edit</button>
            <button class="delete-task-button">Delete</button>
        </div>
    `;
    document.getElementById("tasks").appendChild(taskCard);

    const calendarEvent = calendar.addEvent({
        title: task.name,
        start: task.startDate,
        end: task.dueDate
    });

    taskCard.querySelector(".task-complete-checkbox").addEventListener("change", async(event) => {
        task.completed = event.target.checked;
        // Save to backend
        try {
            await fetch(`http://localhost:3002/tasks/${task._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ IsCompleted: task.completed }),
            });
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
        }
        taskCard.style.textDecoration = event.target.checked ? "line-through" : "none";
    });

    taskCard.querySelector(".edit-task-button").addEventListener("click", () => {
        const taskName = taskCard.querySelector("h3").textContent;
        const startDateTimeText = taskCard.querySelector("p:nth-of-type(1)").textContent.split('Start: ')[1];
        const endDateTimeText = taskCard.querySelector("p:nth-of-type(2)").textContent.split('End: ')[1];
        const taskPriority = taskCard.querySelector("p:nth-of-type(3)").textContent.split('Priority: ')[1];

        const startDateTime = moment(startDateTimeText, "DD/MM/YYYY, HH:mm:ss").toDate();
        const endDateTime = moment(endDateTimeText, "DD/MM/YYYY, HH:mm:ss").toDate();

        // Check if the dates are valid
        if (!isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime())) {
            showEditForm(taskCard, task, startDateTime, endDateTime, taskPriority, calendarEvent);
        } else {
            alert("Invalid date or time format. Please check the task details and try again.");
        }
    });


    taskCard.querySelector(".delete-task-button").addEventListener("click", async () => {
        const taskId = task._id; // Ensure taskId is correctly set
        showCustomPrompt("Are you sure you want to delete this task? Type 'yes' to confirm:", async (response) => {
            if (response && response.toLowerCase() === 'yes') {
                try {
                    await deleteTaskFromServer(taskId);
                    if (taskCard) {
                        taskCard.remove();
                    }
                    if (calendarEvent) {
                        calendarEvent.remove();
                    }
                    console.log(`Task with ID ${taskId} removed from the backend.`);
                } catch (error) {
                    console.error('Failed to delete task:', error);
                }
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

async function addTask(calendar) {
    const formContent = `
        <form id="addTaskForm">
            <label for="taskName">Task Name:</label>
            <input type="text" id="taskName" name="taskName" required>
            <label for="startDate">Start Date (YYYY-MM-DD):</label>
            <input type="date" id="startDate" name="startDate" required>
            <label for="startTime">Start Time (HH:MM):</label>
            <input type="time" id="startTime" name="startTime">
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

    showCustomPrompt("Add Task", async (formData) => {
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
                return;
            }

            const task = {
                name: taskName,
                author: localStorage.getItem("studyBuddyUserName"),
                startDate: startDateTime.toISOString(),
                dueDate: endDateTime.toISOString(),
                priority: taskPriority
            };

            // ✅ Properly wait for the task to be saved
            await saveTaskToServer(task);
        }
    }, true, formContent);
}


function showEditForm(taskCard, task, startDateTime, endDateTime, taskPriority, calendarEvent) {
    const formContent = `
            <form id="editTaskForm">
                <label for="editTaskName">Task Name:</label>
                <input type="text" id="editTaskName" name="taskName" value="${task.name}">
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

    showCustomPrompt("Edit Task", async (formData) => {
        if (formData) {
            const updatedTask = {
                name: formData.get('taskName'),
                startDate: new Date(`${formData.get('taskStartDate')}T${formData.get('taskStartTime')}`).toISOString(),
                dueDate: new Date(`${formData.get('taskEndDate')}T${formData.get('taskEndTime')}`).toISOString(),
                priority: formData.get('taskPriority')
            };

            try {
                const updatedTaskFromServer = await editTaskOnServer(task._id, updatedTask);

                // Update the DOM
                taskCard.querySelector("h3").textContent = updatedTaskFromServer.name;
                taskCard.querySelector("p:nth-of-type(1)").textContent = `Start: ${new Date(updatedTaskFromServer.startDate).toLocaleString()}`;
                taskCard.querySelector("p:nth-of-type(2)").textContent = `End: ${new Date(updatedTaskFromServer.dueDate).toLocaleString()}`;
                taskCard.querySelector("p:nth-of-type(3)").textContent = `Priority: ${updatedTaskFromServer.priority}`;

                // Update the calendar event
                calendarEvent.setProp('title', updatedTaskFromServer.name);
                calendarEvent.setStart(updatedTaskFromServer.startDate);
                calendarEvent.setEnd(updatedTaskFromServer.dueDate);
            } catch (error) {
                console.error('Failed to update task:', error);
            }
        }
    }, true, formContent);
}


// Add a welcome message dynamically
// const welcomeMessage = document.getElementById("welcomeMessage");
// const userName = "Student"; // You can replace this with a user input later
// welcomeMessage.innerHTML = `<h1>Welcome, ${userName}! Let's get started with StudyBuddy!</h1>`;
// welcomeMessage.style.textAlign = "center";
// welcomeMessage.style.marginTop = "20px";
//
// const userNameKey = "studyBuddyUserName";
//
// // Check if a name is already stored
// const storedUserName = localStorage.getItem(userNameKey);
// if (storedUserName) {
//     displayWelcomeMessage(storedUserName);
// } else {
//     promptForUserName();
// }

function promptForUserName() {
    const userNameKey = "studyBuddyUserName";
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