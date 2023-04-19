import React from 'react';

function Navigation(props) {
    const { currentPage, handlePageChange } = props;

    return (
        <nav className='Navigation'>
            <ul>
                <a href="#about" onClick={() => handlePageChange("About") } className={ currentPage === "About" ? "nav-item-active" : "nav-item"}>About Us</a>
            </ul>
            <ul>
                <a href="#login" onClick={() => handlePageChange("Login") } className={ currentPage === "Login" ? "nav-item-active" : "nav-item"}>Login/Signup</a>
            </ul>
            <ul>
                <a href="#contact" onClick={() => handlePageChange("Contact") } className={ currentPage === "Contact" ? "nav-item-active" : "nav-item"}>Contact</a>
            </ul>
            <ul>
                <a href="#dashboard" onClick={() => handlePageChange("Dashboard") } className={ currentPage === "Resume" ? "nav-item-active" : "nav-item"}>Dashboard</a>
            </ul>
        </nav>
    );
}

export default Navigation;
