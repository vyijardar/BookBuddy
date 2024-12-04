import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);

    const navigate = useNavigate()

    function validateForm() {
        const error = []
        if (!firstname.trim()) {
            error.firstname = "First Name is required.";
        }
        if (!lastname.trim()) {
            error.lastname = "Last Name is required.";
        }
        if (!email.trim()) {
            error.email = "Email address is required.";
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
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password
                    })
                })
                const result = await response.json();

                if (result.token) {
                    setToken(result.token); // Store the token
                    localStorage.setItem('token', result.token);
                } else {
                    throw new Error("Failed to sign up, no token received");
                }
                alert("Registered Successfully");

            } catch (error) {
                setError(error.message);
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
                            name="firstname"
                            value={firstname}
                            onChange={(event) => setFirstname(event.target.value)}
                            placeholder="First Name">
                        </input>
                        {error.firstname && <p className="error">{error.firstname}</p>}

                        <h3> Last Name :</h3>
                        <input type="text"
                            name="lastname"
                            value={lastname}
                            onChange={(event) => setLastname(event.target.value)}
                            placeholder="Last Name">
                        </input>
                        {error.lastname && <p className="error">{error.lastname}</p>}

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
                        {error.password && <p className="error">{error.password}</p>}
                        <div className="actions">
                            <button className="btn" type="submit">Submit</button>
                        </div>
                        <div onClick={() => { navigate(`/login`); }} className="link-login" >
                            You already have an account? Login Here!
                        </div>
                    </div>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}