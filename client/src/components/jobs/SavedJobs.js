import React from 'react';
import SavedJobCard from './SavedJobCard';

function SavedJobs() {

    // Declare an array of objects that will get passed into Job element to create the multiple projects (figure out how this comes from the users saved job document -- it will be a number of objects with different properties depending on what we save and what the API initially returne)
    const jobs = [
        {
            company: "Google, Inc.",
            name: "Senior Software Engineer",
            contract_time: "Full Time"
        },
        {
            company: "Amazon",
            name: "Junior Front-End Web Developer",
            contract_time: "Part Time"
        }
    ]

    return (
        <div className='Jobs'>
            <h2>Your Saved Jobs</h2>
            <SavedJobCard jobs={jobs} />
        </div>
    );
}

export default SavedJobs;