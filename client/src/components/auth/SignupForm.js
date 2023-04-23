import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { SIGN_UP } from '../../utils/mutations';


function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser, { error }] = useMutation(SIGN_UP);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };


    return (
        <div className="signup-wrapper signup-active">
            <h2 className='login-title'>Signup</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='input-box'>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        placeholder="First"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        placeholder="Last"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor="signup-email">Email:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="signup-email"
                        onChange={handleChange}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor="signup-pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="signup-pwd"
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p className="error-text">Please complete the signup form</p>
                    </div>
                ) : null}
                <div>
                    <button className="btn" type="submit">Signup</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;