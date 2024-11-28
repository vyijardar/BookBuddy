/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState([]);

    const navigate = useNavigate()

    function validateForm() {
        const error = []
        if (!firstName.trim()) {
            error.firstName = "First Name is required.";
        }
        if (!lastName.trim()) {
            error.lastName = "Last Name is required.";
        }
        if (!email.trim()) {
            error.lastName = "Last Name is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Invalid  email address";
        }
        // Password validation
        if (password.length < 8) {
            error.password = "Password must be at least 8 characters long.";
        } else if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            error.password = "Password must contain at least one special character.";
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
        async function Registration() {
            try {
                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password
                    })
                })
                const result = await response.json();
                console.log(result)

                if (result.token) {
                    setToken(result.token); // Store the token
                    console.log('Login successful, token stored:', result.token);
                    localStorage.setItem('token', result.token);
                } else {
                    throw new Error("Failed to sign up, no token received");
                }
                alert("Registered Successfully");
                
            } catch (error) {
                setError(error.message)
            }

        }
        Registration();
    }
    return (
        <div className="container">
            <div className="register">
                <h1 className="register-header">Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="register-form">
                        <h3>First Name : </h3>
                        <input type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder="First Name">
                        </input>

                        {error.firstName && <p className="error">{error.firstName}</p>}

                        <h3> Last Name :</h3>
                        <input type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder="Last Name">
                        </input>

                        {error.lastName && <p className="error">{error.lastName}</p>}

                        <h3>Email :</h3>
                        <input type="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email">
                        </input>

                        {error.email && <p className="error">{error.email}</p>}

                        <h3>Password :</h3>
                        <input type="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password">
                        </input>
                        <button type="submit">Submit</button>
                        <div onClick={() => { navigate(`/login`); }} className="link-login" >
                            You already have an account? Login Here!
                        </div>
                    </div>
                    {error.password && <p className="error">{error.password}</p>}

                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}