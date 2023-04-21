import React from 'react';
import '../../styles/pages.css';

function Search(props) {

    return (
        <div className='page-content'>
            <div className='search-container search-active'>
                <h3 className='search'>Job Search:</h3>
                <div className='search-box'>
                    <label>Country:</label>
                    <select id='country-select'>
                        <option disabled selected>Please select one</option>
                        <option value='us'>US</option>
                        <option value='gb'>UK</option>
                        <option value='at'>Austria</option>
                        <option value='au'>Australia</option>
                        <option value='be'>Belgium</option>
                        <option value='ca'>Canada</option>
                        <option value='ch'>China</option>
                        <option value='de'>Germany</option>
                        <option value='es'>Spain</option>
                        <option value='fr'>France</option>
                        <option value='in'>India</option>
                        <option value='it'>Italy</option>
                        <option value='mx'>Mexico</option>
                        <option value='nl'>The Netherlands</option>
                        <option value='nz'>New Zealand</option>
                        <option value='pl'>Poland</option>
                        <option value='ru'>Russia</option>
                        <option value='sg'>Singapore</option>
                        <option value='za'>South Africa</option>
                    </select>
                </div>
                <div className='search-box'>
                    <label>Job Title:</label>
                    <select id='job-select'>
                        <option disabled selected>Please select one</option>
                        <option value='software-engineer'>Software Engineer</option>
                        <option value='web-developer'>Web Developer</option>
                        <option value='mobile-app-developer'>Mobile App Developer</option>
                        <option value='data-analyst'>Data Analyst</option>
                        <option value='data-scientist'>Data Scientist</option>
                        <option value='machine-learning-engineer'>Machine Learning Engineer</option>
                        <option value='artificial-intelligence-researcher'>Artificial Intelligence Researcher</option>
                        <option value='cybersecurity-analyst'>Cybersecurity Analyst</option>
                        <option value='network-administrator'>Network Administrator</option>
                        <option value='cloud-architect'>Cloud Architect</option>
                        <option value='devops-engineer'>DevOps Engineer</option>
                        <option value='project-manager'>Project Manager</option>
                        <option value='product-manager'>Product Manager</option>
                        <option value='user-experience-designer'>User Experience Designer</option>
                        <option value='user-interface-designer'>User Interface Designer</option>
                        <option value='quality-assurance-engineer'>Quality Assurance Engineer</option>
                        <option value='technical-writer'>Technical Writer</option>
                        <option value='technical-support-specialist'>Technical Support Specialist</option>
                        <option value='sales-engineer'>Sales Engineer</option>
                        <option value='business-analyst'>Business Analyst</option>
                    </select>
                </div>
                <div className='search-box'>
                    <label>Location:</label>
                    <input id='location' placeholder='city or postal code'></input>
                </div>
                <button id='search-btn'>Search</button>
                <div className='result-container'>
                    <h3 className='results'>Results:</h3>
                </div>
            </div>

        </div>

    );
}

export default Search;
