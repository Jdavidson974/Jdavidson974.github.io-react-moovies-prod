import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navBar'>
            <div className='liste'>
                <Link to="/">HOME</Link>
            </div>
            <div className='liste'>
                <Link to="/coup-de-coeur">COUP DE COEUR</Link>
            </div>
        </div>
    );
};

export default NavBar;