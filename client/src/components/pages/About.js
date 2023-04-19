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
                    Here, you can search up tech jobs by job category, job location, 
                    <br></br>
                    and save the job listings you're insterested in.
                    <br></br>
                    With each job, you can even document your progress and make notes for ourself
                    <br></br>
                    so you're always on top of your employment game.
                    <br></br>
                    Open Source is totally free!
                    <br></br>
                    Sign up and start your tech job hunting journey today!
                </p>
            </div>
        </div>
    );

}

export default About;
