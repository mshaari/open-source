import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import LoginForm from '../auth/LoginForm';
import '../../styles/pages.css';

function Login() {

    const user = useContext(UserContext);

    return (
        <div className='page-content'>
            <div className='login-container'>
                {user.loggedIn? (
                    <p id='loggedout-message'>You're Logged Out!</p>
                ):(
                    <LoginForm currentPage='Login'/>
                )}

            </div>
        </div>
    );
}

export default Login;
