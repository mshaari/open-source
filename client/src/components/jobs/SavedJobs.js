import React from 'react';
import SavedJobCard from './SavedJobCard';

function SavedJobs() {

    // Declare an array of objects that will get passed into Job element to create the multiple projects (figure out how this comes from the users saved job document -- it will be a number of objects with different properties depending on what we save and what the API initially returne)
    const jobs = [
        {
            title: "Google Senior Software Engineer",
            description: "Work as a Software Engineer",
            salary_predicted: 90000,
            contract_time: "Full Time",
            redirect_url: "https://careers.google.com/students/"
        },
        {
            title: "Amazon Back End Developer",
            description: "Work as a back end developer",
            salary_predicted: 100000,
            contract_time: "Part Time",
            redirect_url: "https://www.amazon.com/"
        }
    ]

    return (
        <div className='Jobs'>
            <h3>Your Saved Jobs:</h3>
            <SavedJobCard jobs={jobs} />
        </div>
    );
}

export default SavedJobs;