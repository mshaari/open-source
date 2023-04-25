import React from 'react';
import '../../styles/pages.css';
import '../../styles/job.css';



function JobResultCard(props) {
    

    return (
        <div className='result-list'>
            {props.jobs?.findJobs? (
            <h3 className='results'>Results:</h3>
            ) : null }
            {props.jobs?.findJobs ?  
            (props.jobs.findJobs.map((job) => (
                <div key={job._id} className='result-container'>
                    <a className="result-title" href={job.redirect_url}><h3>{job.title}</h3></a>
                    <div className='job-container'>
                        <p>Contract Time: {job.contract_time}</p>
                        {job.salary_predicted ? 
                        (<h5>Estimated Salary: {job.salary_min} to {job.salary_max}</h5>)
                        : (<h5>Salary not estimated</h5>)
                        }
                        <p className='job-description'>Description: {job.description}</p>
                        {props.isPaidMember ? (
                            <button className="save-job">Save This Job</button>
                        ) : (
                            <p className='reminder-text'>Become a paid member to save this job!</p>
                        )}
                    </div>
                </div> 
            ))
            ) : null }
        </div>
    );
}

export default JobResultCard;