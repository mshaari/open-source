import React, { useState } from 'react';
import SavedJobs from '../jobs/SavedJobs';
import Setting from '../pages/Setting';
import '../../styles/pages.css';

function Dashboard() {
    
    const [showSetting, setShowSetting] = useState(false);

    const openSetting = () => {
        setShowSetting(true);
    };
    
    const closeSetting = () => {
        setShowSetting(false);
    };

    return (
        <div className='page-content'>
            <div className='dashboard-container dashboard-active'>
                <h3 id='dashboard-title'>User Dashboard</h3>
                <h4 className='dashboard-subtitle'>Your Saved Jobs:</h4>
                <SavedJobs />
                <h4 className='dashboard-subtitle'>Your Current Resume/Cover Letter:</h4>
                <button id='resume-copy'>Copy Your Resume</button>
                <button id='cover-letter-copy'>Copy Your Cover Letter</button>
            </div>
            {showSetting? (
                <div>
                    <button id='setting' onClick={closeSetting}>Collapse Settings</button>
                </div>
            ):(
                <div>
                    <button id='setting' onClick={openSetting}>Settings</button>
                </div>
            )} 
            {showSetting? (
                <div>
                    <div id='setting-container' style={{ display: 'block' }}>
                        <Setting />
                    </div>
                </div>
            ):(
                <div>
                    <div id='setting-container' style={{ display: 'none' }}>
                        <Setting />
                    </div>
                </div>
            )}
        </div>

    );
}

export default Dashboard;