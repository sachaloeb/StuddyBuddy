import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
    const [username, setUsername] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.register({ username, FirstName, LastName, email, password });

            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className='login'>
            <div className="container">
                <h2>Register</h2>
                <form id="registerForm">
                    <input type="text" placeholder='Username' id="username" name="username" required/>
                    <input type="text" placeholder='First Name' id="firstName" name="firstName" required/>
                    <input type="text" placeholder='Last Name' id="lastName" name="lastName" required/>
                    <input type="email" placeholder='E-mail' id="email" name="email" required/>
                    <input type="password" placeholder='Password' id="password" name="password" required/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
