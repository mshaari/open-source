import React from 'react';
import '../../styles/pages.css';

function Cancel(props) {

    return (
        <div className='cancel-content'>
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