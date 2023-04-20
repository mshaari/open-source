import React from 'react';

function LoginForm() {
    
        return (
            <div>
                <div className='LoginForm'>
                    <div id="login-signup-wrapper">
                        <div className="login-wrapper login-active" >
                            <h2 className='login-title'>Login</h2>
    
                            <form className="form login-form">
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input className="form-input" type="text" id="email-login" />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input className="form-input" type="password" id="password-login" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary submit" type="submit">Login</button>
                                </div>
                            </form>
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
