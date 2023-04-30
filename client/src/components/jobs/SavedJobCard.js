import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useQuery, useMutation } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query
import { DELETE_JOB } from '../../utils/mutations';
import { ADD_PROGRESS } from '../../utils/mutations';

import '../../styles/job.css';

function JobResultCard(props) {

    const { jobs } = props;

    const [user, setUser, theme, setTheme, toggleTheme] = useContext(UserContext);

    const { userData } = useQuery(QUERY_USER, {
        variables: { id: user.user_id }, // pass the user ID as a variable to the query
        skip: !user.loggedIn, // skip the query if user is not logged in
    });

    if (userData) {
        console.log(userData);
    }

    const [deleteJob, { data, loading, error }] = useMutation(DELETE_JOB);

    const handleRemoveJob = (event) => {

        event.preventDefault();

        const jobId = event.target.id;

        const container = document.querySelector('.saved-result-list');

        container.classList.add('removed');

        setTimeout(async () => {

            try {
                await deleteJob({
                    variables: { _id: jobId }
                });
            } catch (e) {
                console.log(e.message)
            }

            container.classList.remove('removed');
        }, 950)
    };

    //Mutation to add or update progress to a saved job
    const [addProgress, { progressData, isLoading, hasError }] = useMutation(ADD_PROGRESS);

    //this function is triggered when the save progress button is clicked for one of the user's saved jobs
    const handleSaveProgress = async (event) => {

        const alert = event.target.parentElement.previousElementSibling;

        try {
            //we are grabbing the id of the job which the save was triggered on
            const jobId = event.target.id;
            //and we are targeting the selected element of the progress-list, and any notes in the notes section
            let progressSelection = document.getElementById("progress-list" + jobId).value;
            let noteSection = document.getElementById("notes" + jobId).value;
            //storing starting values in an object to track progress
            let prog = {
                apply: false,
                interview: false,
                offer: false,
                end: false,
                notes: noteSection
            };
            //whichever option is currently selected will be set to true in the prog object
            //if no option is selected, all fields are set to false
            switch (progressSelection) {
                case "applied":
                    prog.apply = true;
                    break;
                case "interviewed":
                    prog.interview = true;
                    break;
                case "offer-received":
                    prog.offer = true;
                    break;
                case "end-process":
                    prog.end = true;
                    break;
                default: prog.apply = false;
                    prog.interview = false;
                    prog.offer = false;
                    prog.end = false;
            }
            //running the mutation to add progress to a user, passing in the values for each field as parameters
            await addProgress({
                variables: {
                    id: jobId,
                    applied: prog.apply,
                    interviewed: prog.interview,
                    offerReceived: prog.offer,
                    endProcess: prog.end,
                    notes: prog.notes,

                }
            });
            if (progressData) {
                console.log("Progress Added");
            }
        } catch (e) {
            console.log(e);
        }

        // code to remove .hide class too success alert
        alert.classList.remove('hide');

        setTimeout(() => {
            // code to add .hide class to success alert
            alert.classList.add('hide');
        }, 3000);
    }
    //if progress exists for this job, we set the default value of the dropdown menu to be equal to whichever of the progress fields is true
    const getProgVal = (progress) => {
        if (progress.applied === true) {
            return "applied";
        } else if (progress.interviewed === true) {
            return "interviewed";
        } else if (progress.offer_received) {
            return "offer-received";
        } else if (progress.end_process) {
            return "end-process";
        } else return "default";
    }
    //if progress exists for this job, we return the content of the notes field as the pre-set value of the notes textarea
    const getNotesVal = (progress) => {
        return progress.notes;
    }

    return (
        <div className='saved-result-list'>
            {jobs.map((job) => (
                <div key={job._id} className='saved-result-container' id={`container-${job._id}`}>
                    <a className="saved-result-title" href={job.redirect_url} target="blank"><h3>{job.title}</h3></a>
                    <div className="job-container">
                        <p>Contract Time: {job.contract_time === 'part_time' ? 'Part Time' : job.contract_time === 'full_time' ? 'Full Time' : 'N/A'}</p>
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
                            {job.progress ?
                                (
                                    <select id={"progress-list" + job._id} defaultValue={getProgVal(job.progress)}>
                                        <option value='default'>Please select one</option>
                                        <option value='applied'>Applied</option>
                                        <option value='interviewed'>Interviewed</option>
                                        <option value='offer-received'>Offer Received</option>
                                        <option value='end-process'>Process Ended</option>
                                    </select>
                                )
                                :
                                (
                                    <select id={"progress-list" + job._id}>
                                        <option value='default'>Please select one</option>
                                        <option value='applied'>Applied</option>
                                        <option value='interviewed'>Interviewed</option>
                                        <option value='offer-received'>Offer Received</option>
                                        <option value='end-process'>Process Ended</option>
                                    </select>
                                )
                            }

                        </div>
                        <div className='note-box'>
                            <h5 className='note-title'>Note:</h5>
                            {job.progress ?
                                (
                                    <textarea id={"notes" + job._id} className='textarea' defaultValue={getNotesVal(job.progress)}></textarea>
                                ) :
                                (
                                    <textarea id={"notes" + job._id} className='textarea'></textarea>
                                )}
                        </div>
                        <p className='updated-text hide'>Job Progress Updated!</p>
                        <div>
                            <button id={job._id} className='save-job-progress' onClick={handleSaveProgress}>Save Progress</button>
                            <button id={job._id} className='remove-job' onClick={handleRemoveJob}>Remove This Job!</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobResultCard;