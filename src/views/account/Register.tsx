import React, { useState } from "react";
import "./auth.css";
import { Card } from "react-bootstrap";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }
        if (!isValidEmail(email)) {
            alert("Invalid Email Address");
            return;
        }
        // Send data to register page
        const userData = {
            name: name,
            email: email,
            password: password,
        };
        onSubmit(userData); // Pass user data to onSubmit function
    };

    const isValidEmail = (email: string) => {
        // Email validation logic here (e.g., regex)
        // Return true if valid, false otherwise
        return /\S+@\S+\.\S+/.test(email);
    };

    return (
        <section>
            <div className="container">
                <Card className="form-register m-auto p-5">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Register</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} required />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
                    </form>
                </Card>
            </div>
        </section>
    );
};

export default Register;
