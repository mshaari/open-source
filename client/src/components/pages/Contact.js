import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/pages.css';

function Contact() {
    const form = useRef();

    const [formData, setFormData] = useState({ message: "", user_email: "", user_name: "" });

    // useState hook variables for state of inputs (valid or invalid, i.e. true or false)
    const [messageState, setMessageState] = useState(undefined);
    const [emailState, setEmailState] = useState(undefined);
    const [nameState, setNameState] = useState(undefined);

    //useState hook variables for an alert that will appear if they enter an invalid name/email/message
    const [nameAlert, setNameAlert] = useState('');
    const [emailAlert, setEmailAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');

    const [submissionAlert, setSubmissionAlert] = useState('');

    // State of whether form was submitted or not (determines whether to show or hide)
    const [submittedStatus, setSubmittedStatus] = useState(false);

    const handleFormChange = (e) => {
        e.preventDefault();

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        // Check if the input field is empty
        if (e.target.value === '') {
            // If the input field is empty, alert the user
            if (e.target.name === "user_name") {
                setNameState(false);
                setNameAlert(<p className='formAlert'>Please enter a valid name.</p>)
            } else if (e.target.name === "user_email") {
                setEmailState(false);
                setEmailAlert(<p className='formAlert'>Please enter a valid email.</p>)
            } else if (e.target.name === "message") {
                setMessageState(false);
                setMessageAlert(<p className='formAlert'>Please enter a valid message.</p>)
            }
        } else {
            if (e.target.name === "user_name") {
                setNameState(true);
                setNameAlert('')
            } else if (e.target.name === "user_email") {
                const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

                if (e.target.value.match(regex)) {
                    setEmailState(true);
                    setEmailAlert('')
                    return;
                } else {
                    setEmailState(false);
                    setEmailAlert(<p className='formAlert'>Please enter a valid email.</p>);
                }
            } else if (e.target.name === "message") {
                setMessageState(true);
                setMessageAlert('')
            }
        }
    };


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_62hg44u', 'template_6rsaccs', form.current, '4MeBdfIF5tDbY90qR')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        setFormData({ message: "", user_email: "", user_name: "" });
        setMessageState(undefined);
        setEmailState(undefined);
        setNameState(undefined);

        setSubmissionAlert(<h2 id='submissionAlert'>Thank you for contacting me! I have received your email and will respond as soon as possible.</h2>);

        setSubmittedStatus(true);
    };

    return (
        <div className='page-content'>
            <div className='ContactForm'>
                <h3 className={'submitted' + submittedStatus}>Please fill out the below form to contact me.</h3>

                <form ref={form} onSubmit={sendEmail} className={'submitted' + submittedStatus}>
                    <label>Name</label>
                    <input value={formData.user_name} type="text" name="user_name" onChange={handleFormChange} onBlur={handleBlur} id={'name' + nameState} required />
                    {nameAlert}
                    <label>Email</label>
                    <input value={formData.user_email} type="email" name="user_email" onChange={handleFormChange} onBlur={handleBlur} id={'email' + emailState} required />
                    {emailAlert}
                    <label>Message</label>
                    <textarea value={formData.message} name="message" onChange={handleFormChange} onBlur={handleBlur} id={'message' + messageState} required />
                    {messageAlert}
                    <input id='submitButton' type="submit" value="Send" />
                </form>
                {submissionAlert}
            </div>
        </div>
    );
}

export default Contact;