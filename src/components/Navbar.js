import React, {useContext, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
const Navbar = () => {
    const context = useContext(noteContext);
    const {setIsLoggedIn} = context;
    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        Navigate("/login");
    }
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setIsLoggedIn(false);
        }
    }, [token, setIsLoggedIn]);
    
    const location = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NoteSpell</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">Your Notes</Link>
                            </li>
                        </ul>
                        {localStorage.getItem("token") ? <button type="button" className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button> :
                            <div>
                                <Link to="/login"><button type="button" className="btn btn-primary mx-1">Login</button></Link>
                                <Link to="/signup"><button type="button" className="btn btn-primary mx-1">Signup</button></Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;