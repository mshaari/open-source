import React from 'react';
import '../../styles/pages.css';
import '../../styles/job.css';
import {useMutation} from '@apollo/client';
import {ADD_JOB} from '../../utils/mutations';



function JobResultCard(props) {
    // using ADD_JOB mutation 
    const [saveJob, {data, loading, error }] = useMutation(ADD_JOB);

    const handleSaveButton = async (event) => {
        event.preventDefault();
        try{
            //finding the id of the button which triggered the event, which is set to be the _id field of the job from the API
            const jobId = event.target.id;
            //logging out the jobId to ensure the button click went through successfully, and that it grabs the _id of the correct job
            console.log(jobId)
        //looping through all of the jobs in the array that came from the Search component
        for(let i=0; i<props.jobs.findJobs.length -1 ; i++){
            //while looping through, the current job we are on is assigned to job variable
            let job = props.jobs.findJobs[i];
            //if the current job's _id field matches the jobId which triggered the event, we will want to save that job
            if (job._id === jobId){
                //logging out that job to see the job we will be saving, and we can compare its _id with the jobId we are logging out above
                console.log(job)
                //triggering the saveJob mutation/function, and passing in arguments to create the job
                 await saveJob({
                    variables: {
                        // _id: job._id,
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
                //if the mutation goes through correctly, it will return data, which we can log out to make sure it happened correctly 
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