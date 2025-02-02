document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    if (!form) {
        console.error("❌ Error: #registerForm not found!");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username")?.value;
        const FirstName = document.getElementById("firstName")?.value;
        const LastName = document.getElementById("lastName")?.value;
        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;

        if (!username || !email || !password) {
            displayError("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, FirstName, LastName, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("✅ Registration successful! Redirecting to login...");
            window.location.href = "login.html";  // ✅ Redirect after success
        } catch (error) {
            displayError(error.message);
        }
    });

    // Function to show errors
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
