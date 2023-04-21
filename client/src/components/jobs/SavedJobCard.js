import React from 'react';
import '../../styles/pages.css';

function SavedJobCard(props) {
    const { jobs } = props;

    return (
        <div className='projectList'>
            {jobs.map((job) => (
                <div key={job.name} className='projectListItem'>
                    <a href={job.url}><h3>{job.name}</h3></a>
                    <a href={job.url}><img src={process.env.PUBLIC_URL + '/assets/' + job.image} alt="Preview of this project" /></a>
                    <p className='flashingUrl'>View the <a href={job.url}>Deployed Application</a></p>
                    <p className='flashingUrl'>View the <a href={job.github}>GitHub Repository</a></p>
                    <p></p>
                    {/* progress bar goes here */}
                    <button>Remove this job</button>
                </div>
            ))}
        </div>
    );
}

export default SavedJobCard;