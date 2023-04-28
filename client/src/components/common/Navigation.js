import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.css';
import { UserContext } from '../UserContext';
import { redirect } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

function Navigation() {

  const [user, setUser] = useContext(UserContext);

  const [page, setPage] = useState('about');




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

  const handleClick = (page) => {
    setPage(page);
  }


  return (
    <div>
      {user.loggedIn ? (
        <nav className='navigation'>
          <Link to={'/'} className={page === "about" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('about')}>About Us</Link>
          <Link to={"/login"} onClick={() => handleLogout()} className={page === "login" ? "nav-item-active" : "nav-item"}>Log Out</Link>
          <Link to={'/search'} className={page === "search" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('search')}>Search</Link>
          <Link to={"/dashboard"} className={page === "dashboard" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('dashboard')}>Dashboard</Link>
          {data.user.paid_member ? null : (
            <Link to={"/membership"} className={page === "membership" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('membership')}>Membership</Link>
          )}
          <Link to='/contact' className={page === "contact" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('contact')}>Contact</Link>
        </nav>
      ) : (
        <nav className='navigation'>
          <Link to='/' className={page === "about" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('about')}>About Us</Link>
          <Link to='/login' className={page === "login" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('login')}>Signup/Login</Link>
          <Link to='/contact' className={page === "contact" ? "nav-item-active" : "nav-item"} onClick={() => handleClick('contact')}>Contact</Link>
        </nav>
      )
      }
    </div>
  );
}

export default Navigation;

