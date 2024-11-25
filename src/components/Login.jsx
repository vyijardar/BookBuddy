/* TODO - add your code to create a functional React component that renders a login form */
import { useState, useContext} from "react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const result = await response.json();
            console.log(result)
            login(result.token)
        } catch (error) {
            setError(error.message);
        }
        navigate("/books");
    }
    return (
        <>

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
}