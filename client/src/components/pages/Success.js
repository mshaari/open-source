import { useMutation } from '@apollo/client';
import { UPDATE_MEMBERSHIP } from '../../utils/mutations';
import { UserContext } from '../UserContext';
import React, { useContext } from 'react';
import '../../styles/pages.css';

function Success() {

    const [user, setUser, theme, setTheme, toggleTheme ] = useContext(UserContext);

    const [updateMembership] = useMutation(UPDATE_MEMBERSHIP);

    const handlePaidMember = async () => {


        try {

            // Call the UPDATE_USER mutation to update the user's paid_member status
            const { data } = await updateMembership({
                variables: {
                    id: user.user.data._id,
                }
            });

            console.log({ data })

            // Redirect the user to the home page
            window.location.assign('/');

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className={`success-content ${theme.greyscale ? "greyscale" : ""}`}>
            <div className='success-container active'>
                <h3 id='success-title'>Congratulations!</h3>
                <p id='success-text'>
                    Your payment was processed successfully!
                    <br />
                    You're now on your way to your next tech career!
                    <br />
                    Head to the Search page and the Dashboard page
                    <br />
                    to enjoy all the special features
                    <br />
                    &lt;/open source&gt; offers!
                </p>
                <button className='return' onClick={() => handlePaidMember()}>
                    Start Job Hunting
                </button>
            </div>
        </div>
    );
}

export default Success;