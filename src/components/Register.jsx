/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState([]);

    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,

                })
            });
            if (!response.ok) throw new Error("Login failed");
            const result = await response.json();
            console.log(result)
           

        } catch (err) {
            setError(err.message);
        }
        alert("Registered Successfully");
        navigate(`/login`);
    }
    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <label> First Name :
                    <input type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="First Name">
                    </input>
                </label>
                <label> Last Name :
                    <input type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Last Name">
                    </input>
                </label>
                <label> Email :
                    <input type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email">
                    </input>
                </label>
                <label> Password :
                    <input type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password">
                    </input>
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

    );
}