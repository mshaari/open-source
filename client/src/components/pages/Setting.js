import React, { useState } from 'react';
import '../../styles/pages.css';

function Setting() {

    const [editMode, setEditMode] = useState(false);

    const editData = () => {
        setEditMode(true);
    };

    const saveData = () => {
        setEditMode(false);
        // add code to update user data here?
    };

    const copyLetter = () => {
        const coverLetter = document.getElementById('user-cover-letter').value;
        navigator.clipboard.writeText(coverLetter);
    }

    const copyResume = () => {
        const Resume = document.getElementById('user-resume').value;
        navigator.clipboard.writeText(Resume);
    }

    return (
        <div className='setting-content'>
            <div className='setting-container active'>
                <h3 id='setting-title'>User Settings</h3>
                <div className='data-box'>
                    <label>User First Name:</label>
                    {editMode? (
                        <textarea id="user-first-name"></textarea>
                    ):(
                        <textarea id="user-first-name" readOnly="readonly"></textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Last Name:</label>
                    {editMode? (
                        <textarea id="user-last-name"></textarea>
                    ):(
                        <textarea id="user-last-name" readOnly="readonly"></textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>Username:</label>
                    {editMode? (
                        <textarea id="user-username"></textarea>
                    ):(
                        <textarea id="user-username" readOnly="readonly"></textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Email:</label>
                    {editMode? (
                        <textarea id="user-email"></textarea>
                    ):(
                        <textarea id="user-email" readOnly="readonly"></textarea>
                    )}
                </div>
                <div className='data-box-large'>
                    <label className='label'>User Resume:</label>
                    {editMode? (
                        <textarea id="user-resume"></textarea>
                    ):(
                        <textarea id="user-resume" readOnly="readonly"></textarea>
                    )}
                    <button id='resume-copy' onClick={() => copyResume()}>Copy Your Resume</button>
                </div>
                <div className='data-box-large'>
                    <label className='label'>User Cover Letter:</label>
                    {editMode? (
                        <textarea id="user-cover-letter"></textarea>
                    ):(
                        <textarea id="user-cover-letter" readOnly="readonly"></textarea>
                    )}
                    <button id='cover-letter-copy' onClick={() => copyLetter()}>Copy Your Cover Letter</button>
                </div>
                <div className='data-box'>
                    <button className='edit-btn' onClick={() => editData()}>Edit Settings</button>
                    <button className='edit-btn' onClick={() => saveData()}>Save Changes</button>
                </div>
            </div>
    </div>
    )
};


export default Setting;