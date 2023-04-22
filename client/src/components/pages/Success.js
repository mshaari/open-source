import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../../styles/pages.css';

function Success(props) {

    const [user,setUser] = useContext(UserContext);

    const handlePaidMember = async () => {
        await setUser({loggedIn: true, paidMember: true});
        window.location.assign('/');
    }

    return (

            <div className='success-content'>
                <div className='success-container active'>
                    <h3 id='success-title'>Congratulations!</h3>
                    <p id='success-text'>
                        Your payment was processed successfully!
                        <br></br>
                        You're now on your way to your next tech career!
                        <br></br>
                        Head to the Search page and the Dashboard page
                        <br></br>
                        to enjoy all the special features
                        <br></br>
                        &lt;/open source&gt; offers!
                    </p>
                    <button className='return' onClick={() => handlePaidMember()}>Start Job Hunting</button>
                </div>
            </div>
    );

}

export default Success;