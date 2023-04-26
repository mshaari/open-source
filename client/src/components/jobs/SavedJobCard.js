import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useQuery, useMutation } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query
import { DELETE_JOB } from '../../utils/mutations';
import '../../styles/job.css';

function JobResultCard(props) {
    
    const { jobs } = props;

    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

    const { userData } = useQuery(QUERY_USER, {
        variables: { id: user.user_id }, // pass the user ID as a variable to the query
        skip: !user.loggedIn, // skip the query if user is not logged in
    });

    if (userData) {
        console.log(userData);
    }

    const [deleteJob, {data, loading, error }] = useMutation(DELETE_JOB);

    const handleRemoveJob = (event) => {

        event.preventDefault();

        const jobId = event.target.id;

        const container = document.querySelector('.result-list');

        container.classList.add('removed');

        setTimeout(async() => {

            try {
                
                await deleteJob({
                    variables: {_id: jobId}                 
                });

            
            } catch(e) {
                console.log(e.message)
            }

            container.classList.remove('removed');

        },450)

    };

    return (
        <div className='result-list'>
            {jobs.map((job) => (
                <div key={job.name} className='saved-result-container' id={`container-${job._id}`}>
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
                            <button id={job._id} className='remove-job' onClick={handleRemoveJob}>Remove This Job!</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobResultCard;