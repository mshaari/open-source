import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import SavedJobs from '../jobs/SavedJobs';
import Setting from '../pages/Setting';
import '../../styles/pages.css';

import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query

function Dashboard() {

    const [showSetting, setShowSetting] = useState(false);

    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { id: user.user_id },
        skip: !user.loggedIn,
    });

    const openSetting = () => {
        setShowSetting(true);
    };

    const closeSetting = () => {
        setShowSetting(false);
    };

    return (

        <div className={`page-content ${theme.greyscale ? "greyscale" : ""}`}>
            {data?.user?.paid_member ? (
                <div className='dashboard-container dashboard-active'>
                    <h3 id='dashboard-title'>User Dashboard</h3>
                    <SavedJobs />
                </div>
            ) : (
                <div className='dashboard-container dashboard-active'>
                    <h3 id='dashboard-title'>User Dashboard</h3>
                    <p className='price'>Become a paid member to access your Dashboard!</p>
                </div>
            )}

            {showSetting ? (
                <div>
                    <div id='setting-container' style={{ display: 'block' }}>
                        <Setting />
                    </div>
                </div>
            ) : (
                <div>
                    <div id='setting-container' style={{ display: 'none' }}>
                        <Setting />
                    </div>
                </div>
            )}
            {showSetting ? (
                <div>
                    <button id='setting' onClick={closeSetting}>Collapse Settings</button>
                </div>
            ) : (
                <div>
                    <button id='setting' onClick={openSetting}>Settings</button>
                </div>
            )}
        </div>

    );
}

export default Dashboard;