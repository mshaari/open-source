import React, { useContext } from 'react';
import '../../styles/pages.css';
import { UserContext } from '../UserContext';
import '../../styles/job.css';

function JobResultCard(props) {
    const { jobs } = props;

    const user = useContext(UserContext);


    return (
        <div className='result-list'>
            {jobs.map((job) => (
                <div key={job.name} className='result-container'>
                    <a className="result-title" href={job.redirect_url}><h3>{job.title}</h3></a>
                    <div className='job-container'>
                        <p>Contract Time: {job.contract_time}</p>
                        <h5>Estimated Salary: {job.salary_predicted}</h5>
                        <p>Description: {job.description}</p>

                        {/* TODO: update paid_member context method */}
                        {user[0].paidMember ? (
                            <button className="save-job">Save This Job</button>
                        ) : (
                            <p className='reminder-text'>Become a paid member to save this job!</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobResultCard;