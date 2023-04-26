import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import Navigation from './Navigation';
import '../../styles/header.css';

function Header() {

    // const { currentPage, handlePageChange } = props;

    const [user, setUser, theme, setTheme, toggleTheme] = useContext(UserContext);

    return (
        <div className={`header ${theme.greyscale ? "greyscale" : ""}`}>
            <h1 id='title'><span>&lt;/</span><span>open source</span><span>&gt;</span></h1>
            < Navigation />
        </div>
    );
}

export default Header;
