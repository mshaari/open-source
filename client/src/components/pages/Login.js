import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/SignupForm';
import '../../styles/pages.css';

function Login() {

    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

    return (
        <div className={`page-content ${theme.greyscale ? "greyscale" : ""}`}>
            <div id='login-signup-wrapper'>
                <LoginForm currentPage='Login' />
                <RegisterForm currentPage='Login' />
            </div>
        </div>
    );
}

export default Login;