import React from 'react';
import JobResultCard from './JobResultCard';

function JobResults() {

    // Declare an array of objects that will get passed into Job element to create the multiple projects (array of objects with properties determined by what the API returns)
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
            <h2>Job Results:</h2>
            <JobResultCard jobs={jobs} />
        </div>
    );
}

export default JobResults;
