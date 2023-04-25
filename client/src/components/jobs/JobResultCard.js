import React, { useContext } from 'react';
import '../../styles/pages.css';
import { UserContext } from '../UserContext';
import '../../styles/job.css';

import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query

function JobResultCard({jobs}) {
    
    // const user = useContext(UserContext);

    // const { loading, data } = useQuery(QUERY_USER, {
    //     variables: { id: user.user_id }, // pass the user ID as a variable to the query
    //     skip: !user.loggedIn, // skip the query if user is not logged in
    //   });

    //   if (loading) {
    //     return <p>Loading...</p>;
    //   }
console.log(jobs);

    return (
        <div className='result-list'>
            <h1>TEST FROM INSIDE JOB RESULT CARD _ IF JOBS ARE RETURNED</h1>
            {jobs.findJobs ?  
            (jobs.findJobs.map((job) => (
                <div key={job._id} className='result-container'>
                    <a className="result-title" href={job.redirect_url}><h3>{job.title}</h3></a>
                    <div className='job-container'>
                        <p>Contract Time: {job.contract_time}</p>
                        {job.salary_predicted ? 
                        (<h5>Estimated Salary: {job.salary_min} to {job.salary_max}</h5>)
                        : (<h5>Salary not estimated</h5>)
                        }
                        <p>Description: {job.description}</p>

                        {/* TODO: update paid_member context method */}
                        {/* {data?.user?.paid_member ? (
                            <button className="save-job">Save This Job</button>
                        ) : (
                            <p className='reminder-text'>Become a paid member to save this job!</p>
                        )} */}
                    </div>
                </div>
            ))
            ) : (<h1>TEST</h1>) }

        </div>
    );
}

export default JobResultCard;