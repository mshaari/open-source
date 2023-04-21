import React from 'react';
import '../../styles/pages.css';

function Cancel(props) {

    return (
        <div className='cancel-content'>
            <div className='cancel-container active'>
                <h3 id='cancel-title'>Aww!</h3>
                <p id='cancel-text'>
                    Sorry to see you go!
                    <br></br>
                    Please feel free to drop us a message
                    <br></br>
                    on the Contact page to let us know why
                    <br></br>
                    you decided to cancel your membership!
                </p>
                <a href='/#about' className='return'>Return</a>
            </div>
        </div>
    );

}

export default Cancel;