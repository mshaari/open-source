import React from 'react';
import '../../styles/header.css';

function Navigation(props) {
    const { currentPage, handlePageChange } = props;

    return (
        <nav className='navigation'>
            <a href="#about" onClick={() => handlePageChange("About") } className={ currentPage === "About" ? "nav-item-active" : "nav-item"}>About Us</a>
            <a href="#login" onClick={() => handlePageChange("Login") } className={ currentPage === "Login" ? "nav-item-active" : "nav-item"}>Login/Signup</a>
            <a href="#dashboard" onClick={() => handlePageChange("Dashboard") } className={ currentPage === "Dashboard" ? "nav-item-active" : "nav-item"}>Dashboard</a>
            <a href="#search" onClick={() => handlePageChange("Search") } className={ currentPage === "Search" ? "nav-item-active" : "nav-item"}>Search</a>
            <a href="#contact" onClick={() => handlePageChange("Contact") } className={ currentPage === "Contact" ? "nav-item-active" : "nav-item"}>Contact</a>
            <a href="#membership" onClick={() => handlePageChange("Membership") } className={ currentPage === "Membership" ? "nav-item-active" : "nav-item"}>Membership</a>
        </nav>
    );
}

export default Navigation;
