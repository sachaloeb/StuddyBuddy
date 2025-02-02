document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const FirstName = document.getElementById("FirstName").value;
        const LastName = document.getElementById("LastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3002/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, FirstName, LastName,email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            window.location.href = "/login.html";
        } catch (error) {
            displayError(error.message);
        }
    });

    // Display error messages
    function displayError(message) {
        let errorDiv = document.querySelector(".error");
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.className = "error";
            document.querySelector(".container").appendChild(errorDiv);
        }
        errorDiv.innerText = message;
    }
});