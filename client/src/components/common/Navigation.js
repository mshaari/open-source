import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.css';
import { UserContext } from '../UserContext';
import { redirect } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

function Navigation() {
  const currentPage = window.location.pathname;

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
    return redirect('/')
  }

  return (
    <div>
      {user.loggedIn ? (
        <nav className='navigation'>
          <Link to={'/'} className={currentPage === "/" ? "nav-item-active" : "nav-item"}>About Us</Link>
          <Link to={"/login"} onClick={() => handleLogout()} className={currentPage === "Login" ? "nav-item-active" : "nav-item"}>Log Out</Link>
          <Link to={'/search'} className={currentPage === "/search" ? "nav-item-active" : "nav-item"}>Search</Link>
          <Link to={"/dashboard"} className={currentPage === "/dashboard" ? "nav-item-active" : "nav-item"}>Dashboard</Link>
          {data.user.paid_member ? null : (
            <Link to={"/membership"} className={currentPage === "/membership" ? "nav-item-active" : "nav-item"}>Membership</Link>
          )}
          <Link to='/contact' className={currentPage === "/contact" ? "nav-item-active" : "nav-item"}>Contact</Link>
        </nav>
      ) : (
        <nav className='navigation'>
          <Link to='/' className={currentPage === "/" ? "nav-item-active" : "nav-item"}>About Us</Link>
          <Link to='/login' className={currentPage === "/login" ? "nav-item-active" : "nav-item"}>Signup/Login</Link>
          <Link to='/contact' className={currentPage === "/contact" ? "nav-item-active" : "nav-item"}>Contact</Link>
        </nav>
      )
      }
    </div>

  );
}

export default Navigation;

