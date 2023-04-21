import React from 'react';
import '../../styles/pages.css';

function Membership() {
    return (
        <div className='page-content'>
            <div className='membership-container membership-active'>
                <h3 className='membership-title'>Paid Membership Plan</h3>
                <p className='membership-text'>
                    <span className='price'>A one-time payment of USD$15.00</span>
                    <br></br>
                    <span className='details'>
                        Perks: 
                        <br></br>
                        save and edit your cover letter/ resume on your dashboard
                        <br></br>
                        save job listings to your dashboard
                        <br></br>
                        a checklist for each saved job listing to record your job hunting progress
                        <br></br>
                        make personal notes for yourself for each saved job listing
                    </span>
                </p>
                <button id='checkout'>Pay Now</button>
            </div>
        </div>

    );
}

export default Membership;