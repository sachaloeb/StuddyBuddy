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
});

// Add a welcome message dynamically
const welcomeMessage = document.getElementById("welcomeMessage");
const userName = "Student"; // You can replace this with a user input later
welcomeMessage.innerHTML = `<h1>Welcome, ${userName}! Let's get started with StudyBuddy!</h1>`;
welcomeMessage.style.textAlign = "center";
welcomeMessage.style.marginTop = "20px";
