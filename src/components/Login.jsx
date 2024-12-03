/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function validateForm() {
        const error = []

        if (!email.trim()) {
            error.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Invalid  email address";
        }
        // Password validation
        if (!password.trim()) {
            error.password = "Password is required.";
        } else if (password.length < 4) {
            error.password = "Password must be at least 8 characters long.";
        }

        return error
    }
    async function handleSubmit(event) {
        event.preventDefault();
        // Run validation
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }
        setError([]);

        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const result = await response.json();
            if (result.token) {
                setToken(result.token); // Store the token
                localStorage.setItem('token', result.token);
                alert("Logged in successfully");
                navigate('/account')
            } else {
                throw new Error("Failed to sign up, no token received");
            }
            // setIsLoggedin(true);

        } catch (error) {
            setError(error.message);
        }

    }
    return (
        <div className="container">
            <div className="login">
                <h1 className="login-header">Login</h1>
                <form onSubmit={handleSubmit}>

                    <div className="login-form">
                        <h3>Email :</h3>
                        <input type="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email"
                            id="email">
                        </input>

                        {error.email && <p className="error">{error.email}</p>}

                        <h3>Password :</h3>
                        <input type="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password">
                        </input>
                        {error.password && <p className="error">{error.password}</p>}
                        <div className="actions">
                            <button className="btn" type="submit">Submit</button>
                        </div>
                        <div onClick={() => { navigate(`/register`); }} className="link-register" >
                            You don't have an account? Register Here!
                        </div>
                    </div>

                    {error && <p className="error">{error}</p>}

                </form>

            </div>
        </div>
    );
}