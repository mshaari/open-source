import React, { useContext } from 'react';
import '../../styles/header.css';
import { UserContext } from '../UserContext';

import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query


function Navigation(props) {

    const { currentPage, handlePageChange } = props;

    const [user, setUser] = useContext(UserContext);

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { id: user.user_id }, // pass the user ID as a variable to the query
        skip: !user.loggedIn, // skip the query if user is not logged in
      });

      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        console.log(error);
      }


    const handleLogout = () => {
        setUser({ loggedIn: false });
        // removes token from local storage
        localStorage.clear();
        handlePageChange("About");
    }


    return (
        <div>
            {user.loggedIn ? (
                <nav className='navigation'>
                    <a href="#about" onClick={() => handlePageChange("About")} className={currentPage === "About" ? "nav-item-active" : "nav-item"}>About Us</a>
                    <a href="#login" onClick={() => handleLogout()} className={currentPage === "Login" ? "nav-item-active" : "nav-item"}>Log Out</a>
                    <a href="#search" onClick={() => handlePageChange("Search")} className={currentPage === "Search" ? "nav-item-active" : "nav-item"}>Search</a>
                    {data.user.paid_member ? (
                        <a href="#dashboard" onClick={() => handlePageChange("Dashboard")} className={currentPage === "Dashboard" ? "nav-item-active" : "nav-item"}>Dashboard</a>
                    ) : null}
                    {data.user.paid_member ? null : (
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
