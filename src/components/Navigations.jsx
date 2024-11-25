/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link, Navigate } from "react-router-dom";
import bookLogo from '../assets/books.png';
import { useNavigate } from "react-router-dom";
export default function Navigations() {
    const navigate = useNavigate()
    return (
        <div className="header">
            <img id='logo-image' src={bookLogo}  />
            <h1 id='nav-title' onClick={()=>navigate("/books")}>BookBuddy Library App</h1>
            <nav className="navbar">
                <Link to="/books">Books</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Registration</Link>
                <Link to="/account">Account</Link>
            </nav>
        </div>

    );
}