import React from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/SignupForm';
import '../../styles/pages.css';

function Login() {
    return (
        <div className='page-content'>
            <div className='login-container'>
                <LoginForm currentPage='Login' />
                <RegisterForm currentPage='Login' />
            </div>
        </div>
    );
}

export default Login;