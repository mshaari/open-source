import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import '../../styles/pages.css';

import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query

import { useMutation } from '@apollo/client'; // import useMutation hook
import { UPDATE_USER } from '../../utils/mutations'; // import the mutation

function Setting() {

    const [editMode, setEditMode] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { id: user.user_id },
        skip: !user.loggedIn,
    });

    const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.log(error);
    }

    const EditData = () => {
        setEditMode(true);
    };

    const SaveData = () => {
        setEditMode(false);

        const firstName = document.getElementById('user-first-name').value;
        const lastName = document.getElementById('user-last-name').value;
        const email = document.getElementById('user-email').value;
        const resume = document.getElementById('user-resume').value;
        const coverLetter = document.getElementById('user-cover-letter').value;

        if (!user.loggedIn) {
            return;
        }

        updateUser({
            variables: {
                id: user.user_id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                resume: resume,
                coverLetter: coverLetter,
            }
        }) 
        .then(() => {
            window.location.assign('/#dashboard');
        })
        .catch((error) => {
            console.log(error);
        });
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
                        <textarea id="user-first-name">{data?.user?.first_name}</textarea>
                    ):(
                        <textarea id="user-first-name" readOnly="readonly">{data?.user?.first_name}</textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Last Name:</label>
                    {editMode? (
                        <textarea id="user-last-name">{data?.user?.last_name}</textarea>
                    ):(
                        <textarea id="user-last-name" readOnly="readonly">{data?.user?.last_name}</textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Email:</label>
                    {editMode? (
                        <textarea id="user-email">{data?.user?.email}</textarea>
                    ):(
                        <textarea id="user-email" readOnly="readonly">{data?.user?.email}</textarea>
                    )}
                </div>
                <div className='data-box-large'>
                    <label className='label'>User Resume:</label>
                    {editMode? (
                        <textarea id="user-resume">{data?.user?.resume}</textarea>
                    ):(
                        <textarea id="user-resume" readOnly="readonly">{data?.user?.resume}</textarea>
                    )}
                    <button id='resume-copy' onClick={() => copyResume()}>Copy Your Resume</button>
                </div>
                <div className='data-box-large'>
                    <label className='label'>User Cover Letter:</label>
                    {editMode? (
                        <textarea id="user-cover-letter">{data?.user?.cover_letter}</textarea>
                    ):(
                        <textarea id="user-cover-letter" readOnly="readonly">{data?.user?.cover_letter}</textarea>
                    )}
                    <button id='cover-letter-copy' onClick={() => copyLetter()}>Copy Your Cover Letter</button>
                </div>
                <div className='data-box'>
                    <button className='edit-btn' onClick={() => EditData()}>Edit Settings</button>
                    <button className='edit-btn' onClick={() => SaveData()}>Save Changes</button>
                </div>
            </div>
    </div>
    )
};


export default Setting;