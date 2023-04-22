import React from 'react';
import JobResultCard from './JobResultCard';


function JobResults() {
    // Declare an array of objects that will get passed into Job element to create the multiple projects (array of objects with properties determined by what the API returns)
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
            <JobResultCard jobs={jobs} />
        </div>
    );
}

export default JobResults;