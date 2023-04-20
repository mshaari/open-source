import React from 'react';
import LoginForm from '../auth/LoginForm';
import '../../styles/pages.css';

function Login() {

    return (
        <div className='page-content'>
            <div className='login-container'>
                <LoginForm currentPage='Login'/>
            </div>
        </div>
    );
}

export default Login;
