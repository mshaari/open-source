import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

function LoginForm(props) {
    const [formState, setFormState] = useState({email: '', password: ''});
    const [login, {error, data}] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        //we are grabbing the name and value of whichever field was edited
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name] : value,
        });
    };

    // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };


    
        return (
            <div>
                <div className='LoginForm'>
                    <div id="login-signup-wrapper">
                        <div className="login-wrapper login-active" >
                            <h2 className='login-title'>Login</h2>
                        {data ? (
                            <p>
                                Success!  You may now see your dashboard!
                            </p>
                        ) : (
                            <form className="form login-form" onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                    className="form-input" 
                                    type="text" 
                                    id="email-login"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}

                                     />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input 
                                    className="form-input" 
                                    type="password" 
                                    id="password-login"
                                    name="password"
                                    value={formState.password} 
                                    onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary submit" type="submit">Login</button>
                                </div>
                            </form>
                        )}
                        {error && (
                            <div className="errorMessage">
                                {error.message}
                                </div>
                        )}
                        </div>
                        <div className="signup-wrapper signup-active">
                            <h2 className='login-title'>Signup</h2>
    
                            <form className="form signup-form">
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input className="form-input" type="text" id="name-signup" />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input className="form-input" type="text" id="email-signup" />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input className="form-input" type="password" id="password-signup" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary submit" type="submit">Signup</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    
        );

    
}

export default LoginForm;
