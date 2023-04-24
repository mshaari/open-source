import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import '../../styles/pages.css';
import bcrypt from 'bcryptjs';

import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query

import { useMutation } from '@apollo/client'; // import useMutation hook
import { UPDATE_USER } from '../../utils/mutations'; // import the mutation

function Setting() {


    const [editMode, setEditMode] = useState(false);

    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

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

    const SaveMemberData = async() => {
        setEditMode(false);

        const firstName = document.getElementById('user-first-name').value;
        const lastName = document.getElementById('user-last-name').value;
        const email = document.getElementById('user-email').value;
        const resume = document.getElementById('user-resume').value;
        const coverLetter = document.getElementById('user-cover-letter').value;

        const password = document.getElementById('user-password').value;
        const oldPassword = document.getElementById('user-old-password').value;


        if (!user.loggedIn) {
            return;
        }

        if (password.length) {

            const isValidPassword = await bcrypt.compare(oldPassword, data?.user?.password);

            if (!isValidPassword) {
                // TODO: add modal to alert user instead
                window.alert("Incorrect Password!");
                return;
            };

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            updateUser({
                variables: {
                    id: user.user_id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    resume: resume,
                    coverLetter: coverLetter,
                }
            }) 
            .then(() => {
                // TODO: add modal to alert user instead
                window.location.assign('/#dashboard');
            })
            .catch((error) => {
                console.log(error);
            });

        } else {

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
    };

    const styles ={
        display: "none"
    };

    const SaveData = async () => {
        setEditMode(false);

        const firstName = document.getElementById('user-first-name').value;
        const lastName = document.getElementById('user-last-name').value;
        const email = document.getElementById('user-email').value;

        const password = document.getElementById('user-password').value;
        const oldPassword = document.getElementById('user-old-password').value;

        if (!user.loggedIn) {
            return;
        }

        if (password.length) {

            const isValidPassword = await bcrypt.compare(oldPassword, data?.user?.password);

            if (!isValidPassword) {
                // TODO: add modal to alert user instead
                styles.display = "block";
                // setTimeout(()=> {
                //     styles.display = "none";

                // },2000)
                return;
            };

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            updateUser({
                variables: {
                    id: user.user_id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                }
            }) 
            .then(() => {
                // TODO: add modal to alert user instead
                window.location.assign('/#dashboard');
            })
            .catch((error) => {
                console.log(error);
            });

        } else {

            updateUser({
                variables: {
                    id: user.user_id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                }
            }) 
            .then(() => {
                window.location.assign('/#dashboard');
            })
            .catch((error) => {
                console.log(error);
            });
        };
    };


    const copyLetter = () => {
        const coverLetter = document.getElementById('user-cover-letter').value;
        navigator.clipboard.writeText(coverLetter);
    }

    const copyResume = () => {
        const resume = document.getElementById('user-resume').value;
        navigator.clipboard.writeText(resume);
    }




    return (
        <div className={`setting-content ${theme.greyscale ? "greyscale" : ""}`}>
            <div className='setting-container active'>
                <h3 id='setting-title'>User Settings</h3>
                <div className='data-box'>
                    <label>User First Name:</label>
                    {editMode? (
                        <textarea id="user-first-name" defaultValue={data?.user?.first_name}></textarea>
                    ):(
                        <textarea id="user-first-name" readOnly="readonly" value={data?.user?.first_name}></textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Last Name:</label>
                    {editMode? (
                        <textarea id="user-last-name" defaultValue={data?.user?.last_name}></textarea>
                    ):(
                        <textarea id="user-last-name" readOnly="readonly" value={data?.user?.last_name}></textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Email:</label>
                    {editMode? (
                        <textarea id="user-email" defaultValue={data?.user?.email}></textarea>
                    ):(
                        <textarea id="user-email" readOnly="readonly" value={data?.user?.email}></textarea>
                    )}
                </div>
                {editMode? (
                    <div>
                        <div className='data-box'>
                            <label>Old Password:</label>
                            <textarea id="user-old-password" placeholder='Enter Old Password'></textarea>
                        </div>
                        <div className='data-box'>
                            <label>New Password:</label>
                            <textarea id="user-password" placeholder='Enter New Password'></textarea>
                        </div>
                    </div>
                ):(
                    <div className='data-box'>
                        <label>User Password:</label>
                        <textarea id="user-password" readOnly="readonly" placeholder='*******'></textarea>
                    </div>
                )}
                {data?.user?.paid_member? (
                    <div>
                        <div className='data-box-large'>
                            <label className='label'>User Resume:</label>
                            {editMode? (
                                <textarea id="user-resume" defaultValue={data?.user?.resume || ''}></textarea>
                            ):(
                                <textarea id="user-resume" readOnly="readonly" value={data?.user?.resume || ''}></textarea>
                            )}
                            <button id='resume-copy' onClick={() => copyResume()}>Copy Your Resume</button>
                        </div>
                        <div className='data-box-large'>
                            <label className='label'>User Cover Letter:</label>
                            {editMode? (
                                <textarea id="user-cover-letter" defaultValue={data?.user?.cover_letter || ''}></textarea>
                            ):(
                                <textarea id="user-cover-letter" readOnly="readonly" value={data?.user?.cover_letter || ''}></textarea>
                            )}
                            <button id='cover-letter-copy' onClick={() => copyLetter()}>Copy Your Cover Letter</button>
                        </div>
                        <div className='error-text' style={styles}>
                            <p>Incorrect Password!</p>
                        </div>
                        <div className='data-box'>
                            <button className='edit-btn' onClick={() => EditData()}>Edit Settings</button>
                            <button className='edit-btn' onClick={() => SaveMemberData()}>Save Changes</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='error-text' style={styles}>
                            <p>Incorrect Password!</p>
                        </div>
                        <div className='data-box'>
                            <button className='edit-btn' onClick={() => EditData()}>Edit Settings</button>
                            <button className='edit-btn' onClick={() => SaveData()}>Save Changes</button>
                        </div>

                    </div>
                ) }

            </div>
        </div>
    )
};


export default Setting;