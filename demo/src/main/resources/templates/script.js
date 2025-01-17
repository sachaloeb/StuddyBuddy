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
    const taskName = prompt("Enter task name:");
    const taskDueDate = prompt("Enter due date (YYYY-MM-DD):");
    const taskDueTime = prompt("Enter due time (HH:MM):");
    const taskPriority = prompt("Enter priority (High, Medium, Low):");

    if (taskName && taskDueDate && taskDueTime && taskPriority) {
        const taskDateTime = new Date(`${taskDueDate}T${taskDueTime}:00`);
        if (isNaN(taskDateTime.getTime())) {
            alert("Invalid date or time format. Please try again.");
            return;
        }

        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.innerHTML = `
            <h3>${taskName}</h3>
            <p>Due: ${taskDateTime.toLocaleString()}</p>
            <p>Priority: ${taskPriority}</p>
            <label>
                <input type="checkbox" class="task-complete-checkbox"> Done
            </label>
        `;
        document.getElementById("tasks").appendChild(taskCard);

        // Add the new task to the calendar
        calendar.addEvent({
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
    }
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
    const name = prompt("Welcome to StudyBuddy! Please enter your name:");
    if (name) {
        localStorage.setItem(userNameKey, name);
        displayWelcomeMessage(name);
    }
}

function displayWelcomeMessage(name) {
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.innerHTML = `<h1>Welcome, ${name}! Let's plan your studies.</h1>`;
    welcomeMessage.style.textAlign = "center";
}

// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('theme-toggle').textContent = isDarkMode
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode';
});