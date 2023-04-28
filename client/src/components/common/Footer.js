import React, { useContext, useRef, useEffect } from 'react';
import { UserContext } from '../UserContext'; 
import '../../styles/footer.css';

function Footer() {
    const [user, setUser, theme, setTheme, toggleTheme] = useContext(UserContext); // initializing context values

    const installButtonRef = useRef(null); // creating a reference to the install button

    useEffect(() => { // using the useEffect hook to run some code after the component has been mounted
        const button = installButtonRef.current; // getting a reference to the install button
        if (!button) {
            return; // if the button doesn't exist, we return early
        }

        let deferredPrompt; // initializing a variable to store the deferred install prompt

        // defining a function to handle the 'beforeinstallprompt' event
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault(); // preventing the default browser behavior
            deferredPrompt = event; // storing the deferred prompt
            button.classList.remove('hidden'); // showing the install button
        };

        // defining a function to handle the install button click
        const handleInstallButtonClick = async () => {
            if (!deferredPrompt) {
                return; // if the deferred prompt doesn't exist, we return early
            }

            deferredPrompt.prompt(); // triggering the install prompt

            const choiceResult = await deferredPrompt.userChoice; // getting the user's choice
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt'); // logging the user's choice
            } else {
                console.log('User dismissed the install prompt');
            }

            deferredPrompt = null; // resetting the deferred prompt
            button.classList.add('hidden'); // hiding the install button
        };

        // defining a function to handle the 'appinstalled' event
        const handleAppInstalled = (event) => {
            deferredPrompt = null; // resetting the deferred prompt
        };

        // adding event listeners to the window and the install button
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        button.addEventListener('click', handleInstallButtonClick);
        window.addEventListener('appinstalled', handleAppInstalled);

        // removing event listeners when the component is unmounted
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            button.removeEventListener('click', handleInstallButtonClick);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    // defining a function to scroll back to the top of the page
    const backToTop = () => {
        window.scrollTo(0, 0);
    };

    
    return (
        <footer className={`footer ${theme.greyscale ? "greyscale" : ""}`}>
            <div>
                {theme.greyscale ? (
                    <button id="toggle-theme" onClick={toggleTheme}>Color Mode</button>
                ) : (
                    <button id="toggle-theme" onClick={toggleTheme}>Greyscale Mode</button>
                )}
                <button id="back" onClick={backToTop}>Back to Top</button>
                <button ref={installButtonRef} id="install" className="hidden">Install</button>
            </div>
            <h5 id="footer-title"><span>&lt;/</span><span>Team Open Source, 2023. All rights reserved</span><span>&gt;</span></h5>
        </footer>
    );
}

export default Footer;
