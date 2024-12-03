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
            <div id="header">
                <div class="container">
                    <div className="navbar">
                        <h1 id='nav-title' onClick={() => navigate("/")}><img id='logo-image' src={bookLogo} style={{width:"100",height:"100"}} /> BookBuddy Library App</h1>
                        {token ?
                            (
                                <nav>
                                    <ul>
                                        <li><Link to="/books"><span className="material-icons">auto_stories</span>Books</Link></li>
                                        <li><Link to="/account"><span className="material-icons">account_circle</span>Account</Link></li>
                                        <li><a onClick={logout}><span className="material-icons">logout</span>Logout</a></li>
                                    </ul>
                                </nav>
                            ) :
                            (
                                <nav>
                                    <ul>
                                        <li><Link to="/books"><span className="material-icons">auto_stories</span>Books</Link></li>
                                        <li><Link to="/register"><span className="material-icons">app_registration</span>Registration</Link></li>
                                        <li><Link to="/login"><span className="material-icons">login</span>Login</Link></li>
                                    </ul>
                                </nav>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}