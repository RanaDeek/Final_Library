import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import PIC from '../assets/logo.png';
import PIC2 from '../assets/logo2.png';
import './Navbar.css';
import { CgProfile } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';
    const isSignUp = location.pathname === '/signup';
    const isSignIN = location.pathname === '/signin';
    const isCategory = location.pathname === '/Category';
    const isProfile = location.pathname === '/Profile';
    const isStudent = location.pathname === '/Students';
    const [studentName, setName] = useState("");
    const [userToken, setUserToken] = useState(localStorage.getItem('Student'));
    const getData = () => {
        if (userToken) {
            const decoded = jwtDecode(userToken);
            setName(decoded.name);
        }
    }
    useEffect(() => {
        getData();
    }, [userToken]);


    const logout = () => {
        localStorage.removeItem('Student');
        setUserToken(null);
        setName("");
        navigate('/signin');
    };

    return (
        <nav className={`navbar navbar-expand-lg ${!(isHome || isSignIN || isSignUp || isCategory || isProfile || isStudent) ? 'shadow black-text' : ''}`}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={!(isHome || isSignIN || isSignUp || isCategory || isProfile ||isStudent) ? PIC2 : PIC} alt="Logo" className="d-inline-block align-text-top" />
                    <span className='Title'>Birzeit Library</span>
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/About">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Students">Students</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Category">Category</NavLink>
                        </li>
                    </ul>

                    <form className="d-flex" role="search">
                        {!userToken ? (
                            <>
                                <NavLink to="/signin" className="Log">Sign In</NavLink>
                                <NavLink to="/signup" className="Log">Sign Up</NavLink>
                            </>
                        ) : (
                            <>
                                <div className="nav-item dropdown signin-padding">

                                    <a className="nav-link dropdown-toggle" href='#' id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <CgProfile
                                            style={{
                                                width: '25%',
                                                height: '25%',
                                                color: !(isHome || isSignIN || isSignUp || isCategory || isProfile ||isStudent ) ? '#4A190D' : 'white',
                                                marginBottom: '5px',
                                            }} />
                                        <span>{studentName}</span>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><NavLink className="nav-link" to="/Profile">Profile</NavLink></li>
                                        <li><NavLink className="nav-link" to="/signin" onClick={logout}>LogOut</NavLink></li>
                                    </ul>
                                </div>

                            </>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
