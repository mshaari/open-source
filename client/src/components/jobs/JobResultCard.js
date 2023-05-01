import React, { useState } from 'react';
import '../../styles/pages.css';
import '../../styles/job.css';
import { useMutation } from '@apollo/client';
import { ADD_JOB } from '../../utils/mutations';

function JobResultCard(props) {
    // using ADD_JOB mutation 
    const [saveJob, { data, loading, error }] = useMutation(ADD_JOB);

    const handleSaveButton = async (event) => {

        event.preventDefault();

        try {
            //finding the id of the button which triggered the event, which is set to be the _id field of the job from the API
            const jobId = event.target.id;
            //logging out the jobId to ensure the button click went through successfully, and that it grabs the _id of the correct job
            console.log(jobId)

            if (props.savedJobId.includes(jobId)) {

                event.target.innerText = "You Saved this Job Already!";
                event.target.parentElement.parentElement.parentElement.classList.add("duplicate");

                return;
            };

            //looping through all of the jobs in the array that came from the Search component
            for (let i = 0; i < props.jobs.findJobs.length; i++) {
                //while looping through, the current job we are on is assigned to job variable
                let job = props.jobs.findJobs[i];
                //if the current job's _id field matches the jobId which triggered the event, we will want to save that job

                if (job._id === jobId) {
                    //logging out that job to see the job we will be saving, and we can compare its _id with the jobId we are logging out above
                    console.log(job)
                    //triggering the saveJob mutation/function, and passing in arguments to create the job

                    let button = document.getElementById(jobId);

                    await saveJob({
                        variables: {
                            job: {
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
                        }

                    });

                    button.innerText = "Job Saved!";
                    button.parentElement.parentElement.classList.add("saved");

                    //if the mutation goes through correctly, it will return data, which we can log out to make sure it happened correctly 
                    if (data) {
                        console.log({ data });
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <><div>
            {props.jobs?.findJobs ? (
                <h3 className='results'>Results:</h3>
            ) : null}
        </div><div className='result-list'>
                {props.jobs?.findJobs ?
                    (props.jobs.findJobs.map((job) => (

                        <div key={job._id} className='result-container'>
                            <a className="result-title" href={job.redirect_url} target="blank"><h3>{job.title}</h3></a>
                            <div className='job-container'>
                                <p>Company: {job.company_name}</p>
                                <p>Location: {job.location}</p>
                                <p>Contract Time: {job.contract_time === 'part_time' ? 'Part Time' : job.contract_time === 'full_time' ? 'Full Time' : 'N/A'}</p>
                                {job.salary_predicted ?
                                    (
                                        <h5>Estimated Salary: ${Math.floor(job.salary_min)}.00{job.salary_min !== job.salary_max ? ` - ${Math.floor(job.salary_max)}.00` : ''}</h5>
                                    )
                                    :
                                    (
                                        <h5>Salary not estimated</h5>
                                    )}
                                <p className='job-description'>Description: {job.description}</p>

                                {props.isPaidMember ? (
                                    <div>
                                        <button onClick={() => {
                                            const mailToLink = `mailto:?subject=Look at this job listing I saw on </Open Source> for a ${job.title}!&body=Company: ${job.company_name}%0D%0A Location: ${job.location}%0D%0A Contract Time: ${job.contract_time === 'part_time' ? 'Part Time' : job.contract_time === 'full_time' ? 'Full Time' : 'N/A'}%0D%0A Estimated Salary: $${Math.floor(job.salary_min)}.00${job.salary_min !== job.salary_max ? ` - ${Math.floor(job.salary_max)}.00` : ''}%0D%0A Description: ${job.description}%0D%0A Visit </Open Source> at https://git.heroku.com/open-source.git to learn more!`;
                                            window.location.href = mailToLink;
                                        }} className="share-job">Share This Job</button>
                                        <button onClick={handleSaveButton} className="save-job" id={job._id}>Save This Job</button>
                                    </div>
                                ) : (
                                    <p className='reminder-text'>Become a paid member to save this job!</p>
                                )}
                            </div>
                        </div>
                    ))
                    ) : null}
            </div></>
    );
}

export default JobResultCard;