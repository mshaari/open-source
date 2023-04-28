import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import '../../styles/pages.css';
import { useQuery } from '@apollo/client'; // import useQuery hook
import { QUERY_USER } from '../../utils/queries'; // import the query

import { useMutation } from '@apollo/client'; // import useMutation hook
import { UPDATE_USER, UPDATE_PASSWORD } from '../../utils/mutations'; // import the mutation

function Setting() {


    const [editMode, setEditMode] = useState(false);

    const [passwordEdit, setPasswordEdit] = useState(false);

    const [showError, setShowError] = useState(false);

    const [showComplete, setShowComplete] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    const [showIncomplete, setShowIncomplete] = useState(false);

    const [user, theme] = useContext(UserContext);

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { id: user.user_id },
        skip: !user.loggedIn,
    });

    const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER);

    const[updatePassword, {err}] = useMutation(UPDATE_PASSWORD);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.log(error);
    }

    const editData = () => {
        setEditMode(true);
    };

    const saveMemberData = async () => {

        setEditMode(false);

        const firstName = document.getElementById('user-first-name').value;
        const lastName = document.getElementById('user-last-name').value;
        const email = document.getElementById('user-email').value;
        const resume = document.getElementById('user-resume').value;
        const coverLetter = document.getElementById('user-cover-letter').value;


        if (!user.loggedIn) {
            return;
        };


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

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000);

        })
        .catch((error) => {
            console.log(error);
        });

    };


    const saveData = async () => {

        setEditMode(false);

        const firstName = document.getElementById('user-first-name').value;
        const lastName = document.getElementById('user-last-name').value;
        const email = document.getElementById('user-email').value;

        if (!user.loggedIn) {
            return;
        }

        updateUser({
            variables: {
                id: user.user_id,
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
        })
        .then(() => {

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000);

        })
        .catch((error) => {
            console.log(error);
        });

    };


    const editPassword = () => {
        setPasswordEdit(true);
    }


    const handleUpdatePass = async () => {

        const password = document.getElementById('user-password').value;
        const oldPassword = document.getElementById('user-old-password').value;

        if (!password.length || !oldPassword.length) {

            setShowIncomplete(true);
            setTimeout(() => {
                setShowIncomplete(false);
                setPasswordEdit(false);
            }, 3000);
 
            return;
        }

        try{ 

            const response = await updatePassword({
                variables: {
                    password: password,
                    oldPassword: oldPassword
                }
            });

            if(response.data.updatePassword.update_successful){

                setShowComplete(true);
                setTimeout(() => {
                    setShowComplete(false);
                    setPasswordEdit(false);
                }, 3000);
  
            } else {

                setShowError(true);

                setTimeout(() => {
                    setShowError(false);
                    setPasswordEdit(false);
                }, 3000);
                

            };

        } catch(err) {
            console.log(err.message);
        }
    
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
                    {editMode ? (
                        <textarea id="user-first-name" defaultValue={data?.user?.first_name}></textarea>
                    ) : (
                        <textarea id="user-first-name" readOnly="readonly" value={data?.user?.first_name}></textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Last Name:</label>
                    {editMode ? (
                        <textarea id="user-last-name" defaultValue={data?.user?.last_name}></textarea>
                    ) : (
                        <textarea id="user-last-name" readOnly="readonly" value={data?.user?.last_name}></textarea>
                    )}
                </div>
                <div className='data-box'>
                    <label>User Email:</label>
                    {editMode ? (
                        <textarea id="user-email" defaultValue={data?.user?.email}></textarea>
                    ) : (
                        <textarea id="user-email" readOnly="readonly" value={data?.user?.email}></textarea>
                    )}
                </div>
                {passwordEdit ? (
                    <div>
                        <h3>Changing your Password:</h3>
                        <div className='data-box'>
                            <label>Old Password:</label>
                            <textarea id="user-old-password" placeholder='Enter Old Password'></textarea>
                        </div>
                        <div className='data-box'>
                            <label>New Password:</label>
                            <textarea id="user-password" placeholder='Enter New Password'></textarea>
                        </div>

                        {showError ? (
                            <div>
                                <p className='error-text'>Incorrect Password!</p>
                                <p>Forgot your password? <a id='service-email' href='mailto:service@opensource.com?subject=User Forgot Password'>Email</a> us so we can help you out!</p>
                            </div>
                        ) : null}
                        {showIncomplete? (
                            <div>
                                <p className='error-text'>Please enter your old and new passwords!</p>
                            </div>
                        ): null }
                        {showComplete? (
                            <div>
                                <p className='success-text'>User Password Updated!</p>
                            </div>
                        ): null }
                        <button className='edit-btn' onClick={() => handleUpdatePass()}>Update Password</button>
                    </div>
                ) : (
                    <>
                    <div className='data-box'>
                        <label>User Password:</label>
                        <textarea id="user-password" placeholder='*******' readOnly="readonly"></textarea>
                    </div>
                    <div className='data-box'>
                        <button className='edit-btn' onClick={() => editPassword()}>Change Password</button>
                    </div>
                    </>
                )}
                {data?.user?.paid_member ? (
                    <div>
                        <div className='data-box-large'>
                            <label className='label'>User Resume:</label>
                            {editMode ? (
                                <textarea id="user-resume" defaultValue={data?.user?.resume || ''}></textarea>
                            ) : (
                                <textarea id="user-resume" readOnly="readonly" value={data?.user?.resume || ''}></textarea>
                            )}
                            <button id='resume-copy' onClick={() => copyResume()}>Copy Your Resume</button>
                        </div>
                        <div className='data-box-large'>
                            <label className='label'>User Cover Letter:</label>
                            {editMode ? (
                                <textarea id="user-cover-letter" defaultValue={data?.user?.cover_letter || ''}></textarea>
                            ) : (
                                <textarea id="user-cover-letter" readOnly="readonly" value={data?.user?.cover_letter || ''}></textarea>
                            )}
                            <button id='cover-letter-copy' onClick={() => copyLetter()}>Copy Your Cover Letter</button>
                        </div>

                        {showIncomplete? (
                            <div>
                                <p className='error-text'>Need new password to change password!</p>
                            </div>
                        ): null }
                        {showSuccess ? (
                            <div className='success-text'>
                                <p>User Data Updated!</p>
                            </div>
                        ) : null}

                        <div className='data-box'>
                            <button className='edit-btn' onClick={() => editData()}>Edit Settings</button>
                            <button className='edit-btn' onClick={() => saveMemberData()}>Save Changes</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {showSuccess ? (
                            <div className='success-text'>
                                <p>User Data Updated!</p>
                            </div>
                        ) : null}
                        <div className='data-box'>
                            <button className='edit-btn' onClick={() => editData()}>Edit Settings</button>
                            <button className='edit-btn' onClick={() => saveData()}>Save Changes</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
};


export default Setting;