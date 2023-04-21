import React from 'react';
import SavedJobCard from './SavedJobCard';

function savedJobs() {

    // Declare an array of projects that will get passed into Project element to create the multiple projects (figure out how this comes from the users saved job document)
    const jobs = [
        {
            name: "Recipe Health Guru",
            url: "https://recipe-health-guru.herokuapp.com/",
            github: "https://github.com/jonytoast/health_bar",
            image: "RecipeHealthGuru.png"
        },
        {
            name: "GIF Me Marvel",
            url: "https://mshaari.github.io/gif-me-marvel/",
            github: "https://github.com/mshaari/gif-me-marvel",
            image: "GIFMeMarvel.png"
        },
        {
            name: "HTML, CSS, Git, and JavaScript Review",
            url: "https://mshaari.github.io/prework-study-guide/",
            github: "https://github.com/mshaari/prework-study-guide",
            image: "PreworkStudyGuide.png"
        },
        {
            name: "Tech Blog",
            url: "https://warm-basin-90842.herokuapp.com/",
            github: "https://github.com/mshaari/tech-blog-site",
            image: "TechBlog.png"
        },
        {
            name: "Note Taker",
            url: "https://floating-scrubland-28964.herokuapp.com/notes",
            github: "https://github.com/mshaari/note-taker",
            image: "NoteTaker.png"
        },
        {
            name: "Weather Dashboard",
            url: "https://mshaari.github.io/weather-dashboard/",
            github: "https://github.com/mshaari/weather-dashboard",
            image: "WeatherDashboard.png"
        }
    ]

    return (
        <div className='Jobs'>
            <h2>Your Saved Jobs</h2>
            <SavedJobCard jobs={jobs} />
        </div>
    );
}

export default savedJobs;
