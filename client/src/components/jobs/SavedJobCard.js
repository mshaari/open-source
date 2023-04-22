import React from 'react';
import '../../styles/pages.css';

function JobResultCard(props) {
    const { jobs } = props;

    return (
        <div className='projectList'>
            {jobs.map((job) => (
                <div key={job.name} className='projectListItem'>
                    <a href={job.redirect_url}><h3>{job.title}</h3></a>
                    <h5>{job.salary_predicted}</h5>
                    <p>{job.description}</p>
                    <p>{job.contract_time}</p>
                    {/* <a href={job.url}><img src={process.env.PUBLIC_URL + '/assets/' + job.image} alt="Preview of this project" /></a>
                    <p className='flashingUrl'>View the <a href={job.url}>Deployed Application</a></p>
                    <p className='flashingUrl'>View the <a href={job.github}>GitHub Repository</a></p>
                    <p></p> */}
                    <button>Remove This Job!</button>
                    <p>----</p>
                </div>
            ))}
        </div>
    );
}

export default JobResultCard;