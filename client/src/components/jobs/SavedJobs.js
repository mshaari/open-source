import SavedJobCard from './SavedJobCard';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query

function SavedJobs() {

    const [user, setUser, theme, setTheme, toggleTheme] = useContext(UserContext);

    const { loading, error, data, refetch } = useQuery(QUERY_USER, {
        variables: { id: user.user_id }, // pass the user ID as a variable to the query
        skip: !user.loggedIn, // skip the query if user is not logged in
    });

    useEffect(() => {
        refetch(); // refetch data on component mount
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.log(error);
    }

    return (
        <div className='Jobs'>
            {data.user.saved_jobs.length ? (
                <>
                    <h3>Your Saved Jobs:</h3><SavedJobCard jobs={data.user.saved_jobs} />
                </>
            ) : (
                <>
                    <h3>Your Have No Saved Jobs!</h3>
                </>
            )}
        </div>
    );
}

export default SavedJobs;