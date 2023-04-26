import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../../styles/pages.css';

function Cancel() {

    const [user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

    return (
        <div className={`cancel-content ${theme.greyscale ? "greyscale" : ""}`}>
            <div className='cancel-container active'>
                <h3 id='cancel-title'>Aww!</h3>
                <p id='cancel-text'>
                    Sorry that you changed your mind!
                    <br></br>
                    Please feel free to reach out to us
                    <br></br>
                    on the Contact page to let us know why!
                </p>
                <a href='/' className='return'>Return</a>
            </div>
        </div>
    );

}

export default Cancel;