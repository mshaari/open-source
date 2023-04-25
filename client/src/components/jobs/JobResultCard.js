import React from 'react';
import '../../styles/pages.css';
import '../../styles/job.css';
import {useMutation} from '@apollo/client';
import {ADD_JOB} from '../../utils/mutations';



function JobResultCard(props) {
    
    const [saveJob, {data, loading, error }] = useMutation(ADD_JOB);

    const handleSaveButton = async (event) => {
        event.preventDefault();
        try{
            const jobId = event.target.id;
            console.log(event);
            console.log(jobId)
        for(let i=0; i<props.jobs.findJobs.length -1 ; i++){
            let job = props.jobs.findJobs[i];
            if (job._id === jobId){
                console.log(job)
                 await saveJob({
                    variables: {
                        _id: job._id,
                        company_name: job.company_name,
                        location: job.location,
                        title: job.title,
                        description: job.description,
                        salary_predicted: job.salary_predicted,
                        salary_max: job.salary_max,
                        salary_min: job.salary_min,
                        contract_time: job.contract_time,
                        redirect_url: job.redirect_url
                    }
                });
                if(data){
                    console.log(data)
                }
                
    }} 
        } catch (error){
            console.log(error)
        }
        
        }

    return (
        <div className='result-list'>
            {props.jobs?.findJobs ?  
            (props.jobs.findJobs.map((job) => (
                <div key={job._id} className='result-container'>
                    <a className="result-title" href={job.redirect_url}><h3>{job.title}</h3></a>
                    <div className='job-container'>
                        <p>{job.company_name}</p>
                        <p>Location: {job.location}</p>
                        <p>Contract Time: {job.contract_time}</p>
                        {job.salary_predicted ? 
                        (<h5>Estimated Salary: {job.salary_min} to {job.salary_max}</h5>)
                        : (<h5>Salary not estimated</h5>)
                        }
                        <p>Description: {job.description}</p>

                        {props.isPaidMember ? (
                            <button onClick={handleSaveButton}className="save-job" id={job._id}>Save This Job</button>
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