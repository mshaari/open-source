import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="login-wrapper login-active">
            <h2 className='login-title'>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='input-box'>
                    <label htmlFor="login-email">Email address:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="login-email"
                        onChange={handleChange}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor="login-pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="login-pwd"
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div>
                    <button className="btn" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
