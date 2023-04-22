import React, { useContext } from 'react';
import '../../styles/header.css';
import { UserContext } from '../UserContext';


function Navigation(props) {
    const { currentPage, handlePageChange } = props;

    const [user, setUser] = useContext(UserContext);

    const handleLogout = () => {
        setUser({ loggedIn: false });
        handlePageChange("Login");
    }

    return (
        <div>
            {user.loggedIn ? (
                <nav className='navigation'>
                    <a href="#about" onClick={() => handlePageChange("About")} className={currentPage === "About" ? "nav-item-active" : "nav-item"}>About Us</a>
                    <a href="#login" onClick={() => handleLogout()} className={currentPage === "Login" ? "nav-item-active" : "nav-item"}>Log Out</a>
                    <a href="#search" onClick={() => handlePageChange("Search")} className={currentPage === "Search" ? "nav-item-active" : "nav-item"}>Search</a>
                    {user.paidMember ? (
                        <a href="#dashboard" onClick={() => handlePageChange("Dashboard")} className={currentPage === "Dashboard" ? "nav-item-active" : "nav-item"}>Dashboard</a>
                    ) : (
                        <a href="#membership" onClick={() => handlePageChange("Membership")} className={currentPage === "Dashboard" ? "nav-item-active" : "nav-item"}>Dashboard</a>
                    )}
                    {user.paidMember ? (
                        <a href="#dashboard" onClick={() => handlePageChange("Membership")} className={currentPage === "Membership" ? "nav-item-active" : "nav-item"}>Membership</a>

                    ) : (
                        <a href="#membership" onClick={() => handlePageChange("Membership")} className={currentPage === "Membership" ? "nav-item-active" : "nav-item"}>Membership</a>
                    )}
                    <a href="#contact" onClick={() => handlePageChange("Contact")} className={currentPage === "Contact" ? "nav-item-active" : "nav-item"}>Contact</a>
                </nav>
            ) : (
                <nav className='navigation'>
                    <a href="#about" onClick={() => handlePageChange("About")} className={currentPage === "About" ? "nav-item-active" : "nav-item"}>About Us</a>
                    <a href="#login" onClick={() => handlePageChange("Login")} className={currentPage === "Login" ? "nav-item-active" : "nav-item"}>Signup/Login</a>
                    <a href="#contact" onClick={() => handlePageChange("Contact")} className={currentPage === "Contact" ? "nav-item-active" : "nav-item"}>Contact</a>
                </nav>
            )
            }
        </div>

    );
}

export default Navigation;
