import React from 'react';


function About() {
    return (
        <div>
            <div className='About'>
                <img src={process.env.PUBLIC_URL + '/assets/Headshot.png'} alt="Headshot of Michael Shaari" className='Headshot' />
                <p className='AboutMe'>About Us</p>
            </div>
        </div>

    );
}

export default About;
