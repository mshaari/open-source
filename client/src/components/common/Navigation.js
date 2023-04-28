import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/header.css';
import { UserContext } from '../UserContext';
import { redirect } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

function Navigation() {

  const [user, setUser] = useContext(UserContext);

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: user.user_id },
    skip: !user.loggedIn,
  });

  const [pathname, setPathname] = useState('/');

  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

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
        <nav className='navigation' >
          <Link to={'/'} className={pathname === "/" ? "nav-item-active" : "nav-item"}>About Us</Link>
          <Link to={"/login"} onClick={() => handleLogout()} className={pathname === "/login" ? "nav-item-active" : "nav-item"}>Log Out</Link>
          <Link to={'/search'} className={pathname === "/search" ? "nav-item-active" : "nav-item"}>Search</Link>
          <Link to={"/dashboard"} className={pathname === "/dashboard" ? "nav-item-active" : "nav-item"}>Dashboard</Link>
          {data.user.paid_member ? null : (
            <Link to="/membership" className={pathname === "/membership" ? "nav-item-active" : "nav-item"}>Membership</Link>
          )}
          <Link to='/contact' className={pathname === "/contact" ? "nav-item-active" : "nav-item"}>Contact</Link>
        </nav>
      ) : (
        <nav className='navigation'>
          <Link to='/' className={pathname === "/" ? "nav-item-active" : "nav-item"}>About Us</Link>
          <Link to='/login' className={pathname === "/login" ? "nav-item-active" : "nav-item"}>Signup/Login</Link>
          <Link to='/contact' className={pathname === "/contact" ? "nav-item-active" : "nav-item"}>Contact</Link>
        </nav>
      )
      }
    </div>
  );
}

export default Navigation;

