import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import JobResultCard from '../jobs/JobResultCard';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_JOBS } from '../../utils/queries'; //Imports the query we made in client/src/utils/queries.js
import { QUERY_USER } from '../../utils/queries'; // Imports the query we made in client/src/utils/queries.js
import '../../styles/pages.css';

// The Search component renders a search form for jobs. The form has three input fields: Country, Job Title, and Location.
function Search() {
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [jobData, setData] = useState();
   
    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);
   
    const [findJobs, {loading, error, data}] = useLazyQuery(QUERY_JOBS,
       { 
           variables: {country: country, role: role, location: location}
       }
   );
   
    const userData = useQuery(QUERY_USER, {
       variables: { id: user.user.data._id },
    });
   
    // const handleSearch = async (event) => {
    //    event.preventDefault();
    //    try {
    //        await findJobs();
    //    } catch (e) {
    //        console.log(e);
    //    }
    // };

 return (
  <div className={`page-content ${theme.greyscale ? "greyscale" : ""}`}>
   <div className='search-container search-active'>
    <h3 className='search'>Job Search:</h3>
    <div className='search-box'>
     <label>Country:</label>
     <select id='country-select' onChange={(e) => setCountry(e.target.value)}>
      <option disabled selected>Please select one</option>
      <option value='us'>United States</option>
      <option value='gb'>United Kingdom</option>
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
     <select id='job-select' onChange={(e) => setRole(e.target.value)}>
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
     <input id='location' placeholder='city or postal code' onChange={(e) => setLocation(e.target.value)}></input>
    </div>
    {/* When the user clicks the Search button, the findJobs is called. It triggers a GraphQL query using the useLazyQuery hook from Apollo to fetch job data based on the user's input. */}
    <button id='search-btn' onClick={() => findJobs({ variables: {country: country, role: role, location: location}})}>Search</button>
    <div>
    {/* The Search component renders a JobResultCard component passing the data and userData as props.  */}
     <JobResultCard jobs={data} isPaidMember={userData.data.user.paid_member}/>
    </div>
   </div>
  </div>
 );
}
export default Search;