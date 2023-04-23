import React from 'react';
import '../../styles/job.css';

function JobResultCard(props) {
    const { jobs } = props;

    return (
        <div className='result-list'>
            {jobs.map((job) => (
                <div key={job.name} className='result-container'>
                    <a className="result-title" href={job.redirect_url}><h3>{job.title}</h3></a>
                    <div className="job-container">
                        <p>Contact Term: {job.contract_time}</p>
                        <h5>Estimated Salary: {job.salary_predicted}</h5>
                        <p>Description: {job.description}</p>

                        {/* <a href={job.url}><img src={process.env.PUBLIC_URL + '/assets/' + job.image} alt="Preview of this project" /></a>
                        <p className='flashingUrl'>View the <a href={job.url}>Deployed Application</a></p>
                        <p className='flashingUrl'>View the <a href={job.github}>GitHub Repository</a></p>
                        <p></p> */}
                        <h5 className='status'>Current Status:</h5>
                        <select>
                            <option disabled>Please select one</option>
                            <option value='applied'>Applied</option>
                            <option value='interviewed'>Interviewed</option>
                            <option value='offer-received'>Offer Received</option>
                            <option value='end-process'>Process Ended</option>
                        </select>
                        <div className='note-box'>
                            <h5>Note:</h5>
                            <textarea className='textarea'></textarea>
                        </div>
                        <button className='remove-job'>Remove This Job!</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobResultCard;