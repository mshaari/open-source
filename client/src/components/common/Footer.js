import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../../styles/footer.css';

function Footer() {

    const backToTop = () => {
        window.scrollTo(0, 0);
    };

    const [user, setUser, theme, setTheme, toggleTheme] = useContext(UserContext);


    return (
        <footer className={`footer ${theme.greyscale ? "greyscale" : ""}`}>
            <div>
                {theme.greyscale ? (
                    <button id="toggle-theme" onClick={toggleTheme}>Color Mode</button>
                ) : (
                    <button id="toggle-theme" onClick={toggleTheme}>Greyscale Mode</button>
                )}
                <button id="back" onClick={backToTop}>Back to Top</button>
                <button id="install">Install</button>
            </div>
            <h5 id="footer-title"><span>&lt;/</span><span>Team Open Source, 2023. All rights reserved</span><span>&gt;</span></h5>
        </footer>
    );
}

export default Footer;
