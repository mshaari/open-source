import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import '../../styles/pages.css';

import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query


function About() {

    const [user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { id: user.user_id }, // pass the user ID as a variable to the query
        skip: !user.loggedIn, // skip the query if user is not logged in
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.log(error);
    }



    return (
        <div className={`page-content ${theme.greyscale ? "greyscale" : ""}`}>
            <div id='about-container' className='about-container active'>
                {user.loggedIn ? (
                    <h3 id='about-title'>Hello there,
                        <br></br>
                        {data.user.first_name}!
                    </h3>
                ) : (
                    <h3 id='about-title'>What's  &lt;/open source&gt; ?</h3>
                )}
                {data?.user?.paid_member ? (
                    <p id='about-text'>
                        Hope your tech job hunting is going superbly!
                        <br></br>
                        Don't forget to give us your feedback
                        <br></br>
                        by sending us a message on the Contact page!
                    </p>
                ) : (
                    <p id='about-text'>
                        &lt;/open source&gt; is your one-stop-shop for tech job seekers!
                        <br></br>
                        Sign up for free and search for tech jobs by category and location,
                        <br></br>
                        and with our paid membership plan for just <span className="price">$14.99</span>,
                        <br></br>
                        you'll get to save the job listings you're insterested in,
                        <br></br>
                        document your progress, and make notes for yourself,
                        <br></br>
                        so you're always on top of your employment game!
                        <br></br>
                        Sign up and start your tech job hunting journey today!
                    </p>
                )}

            </div>
        </div>
    );

}

export default About;
