import React, { useRef, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import emailjs from '@emailjs/browser';
import '../../styles/pages.css';

function Contact() {

    const [ user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

    const form = useRef();

    const [messageState, setMessageState] = useState(undefined);
    const [emailState, setEmailState] = useState(undefined);
    const [nameState, setNameState] = useState(undefined);

    const [submissionAlert, setSubmissionAlert] = useState('');

    // State of whether form was submitted or not (determines whether to show or hide)
    const [submittedStatus, setSubmittedStatus] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_62hg44u', 'template_6rsaccs', form.current, '4MeBdfIF5tDbY90qR')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        setMessageState('');
        setEmailState('');
        setNameState('');

        setSubmissionAlert(<h2 id='submission-message'>Message received, thank you!<span id='redirect'>Redirecting you to Home Page ...</span></h2>);

        setSubmittedStatus(true);

        setTimeout(()=> {
            document.location.reload();
        },3000);
    };

    return (
        <div className={`page-content ${theme.greyscale ? "greyscale" : ""}`}>
            <div className='contact-form-container contact-active'>
                <h3 className='contact-title'>Got questions?</h3>
                <h3>Fill out the form below and we'll get back to you ASAP!</h3>

                <form ref={form} onSubmit={sendEmail} className={'submitted' + submittedStatus}>
                    <div className='input'>
                        <label>Name:</label>
                        <input value={nameState} type="text" name="user_name" id={'name' + nameState} required />
                    </div>
                    <div className='input'>
                        <label>Email:</label>
                        <input value={emailState} type="email" name="user_email" id={'email' + emailState} required />
                    </div>
                    <div className='message-input'>
                        <label className='message-label'>Message:</label>
                        <textarea className="textarea" value={messageState} name="message" id={'message' + messageState} required />
                    </div>
                    <div className='submit'>
                        <input id='submit-button' type="submit" value="Submit" />
                    </div>
                    {submissionAlert}
                </form>
            </div>
        </div>
    );
}

export default Contact;