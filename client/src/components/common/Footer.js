import React from 'react';
import '../../styles/footer.css';

function Footer() {
    return (
        <footer>
            <ul className='FooterElements'>
                <li>
                    <a href="https://github.com/mshaari">GitHub</a>
                </li>

                <li>
                    <a href="https://stackoverflow.com/users/21660005/michael-s">Stack Overflow</a>
                </li>

                <li>
                    <a href="https://www.linkedin.com/in/michael-shaari/">LinkedIn</a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
