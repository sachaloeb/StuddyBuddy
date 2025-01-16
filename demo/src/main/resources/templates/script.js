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
});

function setupTaskTracking() {
    console.log("Task tracking placeholder initialized.");
    // Future: Add dynamic task handling here
}

function setupStudyRecommendations() {
    console.log("Study recommendations placeholder initialized.");
    // Future: Add recommendation algorithms here
}

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

document.addEventListener("DOMContentLoaded", () => {
    // Existing code...

    // Add event listener for adding a new task
    document.getElementById("addTaskButton").addEventListener("click", addTask);

    // Function to add a new task
    function addTask() {
        const taskName = prompt("Enter task name:");
        const taskDueDate = prompt("Enter due date (YYYY-MM-DD):");
        const taskPriority = prompt("Enter priority (High, Medium, Low):");

        if (taskName && taskDueDate && taskPriority) {
            const taskCard = document.createElement("div");
            taskCard.className = "task-card";
            taskCard.innerHTML = `
                <h3>${taskName}</h3>
                <p>Due: ${taskDueDate}</p>
                <p>Priority: ${taskPriority}</p>
            `;
            document.getElementById("tasks").appendChild(taskCard);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            { title: 'Math Class', start: '2025-11-01T10:00:00' },
            { title: 'Doctor Appointment', start: '2025-11-01T12:00:00' },
            { title: 'Study: Algorithms', start: '2025-11-01T14:00:00' }
        ]
    });

    calendar.render();
});


// document.addEventListener("DOMContentLoaded", () => {
//     const modal = document.getElementById("modal");
//     const introButton = document.getElementById("introButton");
//     const closeModal = document.getElementById("closeModal");
//
//     // Show the modal when the button is clicked
//     introButton.addEventListener("click", () => {
//         modal.style.display = "flex";
//     });
//
//     // Hide the modal when the close button is clicked
//     closeModal.addEventListener("click", () => {
//         modal.style.display = "none";
//     });
//
//     // Hide the modal if the user clicks outside of it
//     window.addEventListener("click", (event) => {
//         if (event.target === modal) {
//             modal.style.display = "none";
//         }
//     });
//
//     // Placeholder for future features
//     setupTaskTracking();
//     setupStudyRecommendations();
//
//     // Initialize FullCalendar
//     var calendarEl = document.getElementById('calendar');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         events: [
//             { title: 'Math Class', start: '2025-11-01T10:00:00' },
//             { title: 'Doctor Appointment', start: '2025-11-01T12:00:00' },
//             { title: 'Study: Algorithms', start: '2025-11-01T14:00:00' }
//         ]
//     });
//     calendar.render();
//
//     // Add event listener for adding a new task
//     document.getElementById("addTaskButton").addEventListener("click", () => addTask(calendar));
// });
//
// function setupTaskTracking() {
//     console.log("Task tracking placeholder initialized.");
//     // Future: Add dynamic task handling here
// }
//
// function setupStudyRecommendations() {
//     console.log("Study recommendations placeholder initialized.");
//     // Future: Add recommendation algorithms here
// }
//
// // Add a welcome message dynamically
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
//
// function promptForUserName() {
//     const name = prompt("Welcome to StudyBuddy! Please enter your name:");
//     if (name) {
//         localStorage.setItem(userNameKey, name);
//         displayWelcomeMessage(name);
//     }
// }
//
// function displayWelcomeMessage(name) {
//     const welcomeMessage = document.getElementById("welcomeMessage");
//     welcomeMessage.innerHTML = `<h1>Welcome, ${name}! Let's plan your studies.</h1>`;
//     welcomeMessage.style.textAlign = "center";
// }
//
// function addTask(calendar) {
//     const taskName = prompt("Enter task name:");
//     const taskDueDate = prompt("Enter due date (YYYY-MM-DD):");
//     const taskPriority = prompt("Enter priority (High, Medium, Low):");
//
//     if (taskName && taskDueDate && taskPriority) {
//         const taskCard = document.createElement("div");
//         taskCard.className = "task-card";
//         taskCard.innerHTML = `
//             <h3>${taskName}</h3>
//             <p>Due: ${taskDueDate}</p>
//             <p>Priority: ${taskPriority}</p>
//         `;
//         document.getElementById("tasks").appendChild(taskCard);
//
//         // Add the new task to the calendar
//         calendar.addEvent({
//             title: taskName,
//             start: taskDueDate
//         });
//     }
// }
