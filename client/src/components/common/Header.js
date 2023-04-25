import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import Navigation from './Navigation';
import '../../styles/header.css';

function Header(props) {

    const { currentPage, handlePageChange } = props;

    const [user, setUser, theme, setTheme] = useContext(UserContext);

    return (
        <div className={`header ${theme.greyscale ? "greyscale" : ""}`}>
            <h1 id='title'><span>&lt;/</span><span>open source</span><span>&gt;</span></h1>
            < Navigation currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
}

export default Header;
