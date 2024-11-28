/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import bookLogo from '../assets/books.png';
import { Link, useNavigate } from "react-router-dom";
export default function Navigations({ token, setToken, setisLoggedIn }) {
    const navigate = useNavigate()
    async function logout() {
        setisLoggedIn(false);
        setToken(null);
        navigate('/login');
    }
    return (
        <>
            {token ?
                (<div className="header">
                    <img id='logo-image' src={bookLogo} />
                    <h1 id='nav-title' onClick={() => navigate("/books")}>BookBuddy Library App</h1>
                    <nav className="navbar">
                        <Link to="/books">Books</Link>
                        <Link to="/account">Account</Link>
                        <a onClick={logout}>Logout</a>
                    </nav>
                </div>) :
                (<div className="header">
                    <img id='logo-image' src={bookLogo} />
                    <h1 id='nav-title' onClick={() => navigate("/books")}>BookBuddy Library App</h1>
                    <nav className="navbar">
                        <Link to="/books">Books</Link>
                        <Link to="/register">Registration</Link>
                    </nav>
                </div >)}

        </>
    );
}