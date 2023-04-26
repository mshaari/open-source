import React from 'react';
import '../../styles/job.css';

function JobResultCard(props) {
    const { jobs } = props;

    return (
        <div className='result-list'>
            {jobs.map((job) => (
                <div key={job.name} className='saved-result-container'>
                    <a className="saved-result-title" href={job.redirect_url}><h3>{job.title}</h3></a>
                    <div className="job-container">
                        <p>Contact Term: {job.contract_time}</p>
                        {job.salary_predicted ? 
                            (
                                <h5>Estimated Salary: ${Math.floor(job.salary_min)}.00{job.salary_min !== job.salary_max ? ` - ${Math.floor(job.salary_max)}.00` : ''}</h5>
                            )
                            : 
                            (
                                <h5>Salary not estimated</h5>
                            )
                        }
                        <p className='saved-job-description'>Description: {job.description}</p>
                        <div className='note-box'>
                            <h5 className='status'>Current Status:</h5>
                            <select>
                                <option>Please select one</option>
                                <option value='applied'>Applied</option>
                                <option value='interviewed'>Interviewed</option>
                                <option value='offer-received'>Offer Received</option>
                                <option value='end-process'>Process Ended</option>
                            </select>
                        </div>
                        <div className='note-box'>
                            <h5 className='note-title'>Note:</h5>
                            <textarea className='textarea'></textarea>
                        </div>
                        <div>
                            <button className='remove-job'>Save Progress</button>
                            <button className='remove-job'>Remove This Job!</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobResultCard;