document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3002/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            window.location.href = "../index.html"; // Redirect to homepage
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