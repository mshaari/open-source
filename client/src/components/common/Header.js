import React from 'react';
import Navigation from './Navigation';
import '../../styles/header.css';

function Header(props) {

    const { currentPage, handlePageChange } = props;

    return (
        <div className='header'>
            <h1 id='title'><span>&lt;/</span><span>open source</span><span>&gt;</span></h1>
            < Navigation currentPage={currentPage} handlePageChange={handlePageChange}/>
        </div>
    );
}

export default Header;
