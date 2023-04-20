import React from 'react';
import '../../styles/pages.css';

function About(props) {



    return (
        <div className='page-content'>
            <div className='about-container active'>
                <h3 id='about-title'>What's  &lt;/Open Source&gt; ?</h3>
                <p id='about-text'>
                    &lt;/Open Source&gt; is your one-stop-shop for tech job seekers!
                    <br></br>
                    Here, you can sign up for free and search for tech jobs by category and location, 
                    <br></br>
                    and with our paid membership plan for just $15.00,
                    <br></br> 
                    youu'll get to save the job listings you're insterested in,
                    <br></br>
                    document your progress, and make notes for yourself,
                    <br></br>
                    so you're always on top of your employment game!
                    <br></br>
                    Sign up and start your tech job hunting journey today!
                </p>
            </div>
        </div>
    );

}

export default About;
