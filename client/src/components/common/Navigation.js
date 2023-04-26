import React, { useContext } from 'react';
import '../../styles/header.css';
import { UserContext } from '../UserContext';
import { redirect } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

function Navigation(props) {
  // const { currentPage, handlePageChange } = props;
  const [user, setUser] = useContext(UserContext);

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: user.user_id },
    skip: !user.loggedIn,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  const handleLogout = () => {
    setUser({ loggedIn: false });
    localStorage.removeItem('id_token');
    handlePageChange("About");
  }

  const handleClick = (page) => {
    // handlePageChange(page);
    // const element = document.getElementById(page.toLowerCase());
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth' });
    // }
    return redirect("")
  }

  return (
    <div>
      {user.loggedIn ? (
        <nav className='navigation'>
          <a href="#about" onClick={() => handleClick("About")} className={currentPage === "About" ? "nav-item-active" : "nav-item"}>About Us</a>
          <a href="#login" onClick={() => handleLogout()} className={currentPage === "Login" ? "nav-item-active" : "nav-item"}>Log Out</a>
          <a href="#search" onClick={() => handleClick("Search")} className={currentPage === "Search" ? "nav-item-active" : "nav-item"}>Search</a>
          <a href="#dashboard" onClick={() => handleClick("Dashboard")} className={currentPage === "Dashboard" ? "nav-item-active" : "nav-item"}>Dashboard</a>
          {data.user.paid_member ? null : (
            <a href="#membership" onClick={() => handleClick("Membership")} className={currentPage === "Membership" ? "nav-item-active" : "nav-item"}>Membership</a>
          )}
          <a href="#contact" onClick={() => handleClick("Contact")} className={currentPage === "Contact" ? "nav-item-active" : "nav-item"}>Contact</a>
        </nav>
      ) : (
        <nav className='navigation'>
          <a href="#about" onClick={() => handleClick("About")} className={currentPage === "About" ? "nav-item-active" : "nav-item"}>About Us</a>
          <a href="#login" onClick={() => handleClick("Login")} className={currentPage === "Login" ? "nav-item-active" : "nav-item"}>Signup/Login</a>
          <a href="#contact" onClick={() => handleClick("Contact")} className={currentPage === "Contact" ? "nav-item-active" : "nav-item"}>Contact</a>
        </nav>
      )
      }
    </div>

  );
}

export default Navigation;

