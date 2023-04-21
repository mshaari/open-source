import React from 'react';
import '../../styles/pages.css';

function Dashboard() {
    return (
        <div className='page-content'>
            <div className='dashboard-container dashboard-active'>
                <h3 id='dashboard-title'>User Dashboard</h3>
                <h4 className='dashboard-subtitle'>Your Saved Jobs:</h4>
                {/* insert savedjobs component here */}
                <h4 className='dashboard-subtitle'>Your Current Resume/Cover Letter:</h4>
                <button id='resume-copy'>Copy Your Resume</button>
                <button id='cover-letter-copy'>Copy Your Cover Letter</button>
            </div>
        </div>

    );
}

export default Dashboard;
