import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import Checkout from '../../utils/Checkout';
import '../../styles/pages.css';

function Membership() {

    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);
    
    return (
        <div className={`page-content ${theme.greyscale ? "greyscale" : ""}`}>
            <div className='membership-container membership-active'>
                <h3 className='membership-title'>Paid Membership Plan</h3>
                <p className='membership-text'>
                    <span className='price'>A one-time payment of USD$14.99</span>
                    <br></br>
                    <span className='details'>
                        Perks:
                        <br></br>
                        ✦ Save and edit your cover letter/resume on your dashboard
                        <br></br>
                        ✦ Save job listings to your dashboard
                        <br></br>
                        ✦ A status field for your saved jobs to track your job hunting progress
                        <br></br>
                        ✦ Make personal notes for yourself for each saved job listing
                    </span>
                </p>
                <Checkout></Checkout>
            </div>
        </div>
    );
}

export default Membership;