import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
        <h1>
            <Link to= '/' className='noDec oLink'>
                <h1 id='navHeader'>
                    <i class="fas fa-pepper-hot"></i>&nbsp; 
                    Feastify
                </h1>
            </Link>
        </h1>
        <ul>
            <li>
               <Link to="/register" className='noDec oLink navLink'>Register</Link>
            </li>
            <li>
                <Link to="/login" className='noDec oLink navLink'>Login</Link>
            </li>
        </ul>
        </nav>
    )
}

export default Navbar