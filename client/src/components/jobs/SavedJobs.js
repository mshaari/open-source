import SavedJobCard from './SavedJobCard';
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query

function SavedJobs() {

    // Declare an array of objects that will get passed into Job element to create the multiple projects (figure out how this comes from the users saved job document -- it will be a number of objects with different properties depending on what we save and what the API initially returne)


    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

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

    if (data) {
        
    }

    return (
        <div className='Jobs'>
            <h3>Your Saved Jobs:</h3>
            <SavedJobCard jobs={data.user.saved_jobs} />
        </div>
    );
}

export default SavedJobs;