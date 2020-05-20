import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import '../styles/navbar.css'


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/recipes' className='noDec oLink navLink'>
                    Recipes
                </Link>
            </li>
            <li>
                <Link to='/profiles' className='noDec oLink navLink'>
                    Users
                </Link>
            </li>
            <li>
                <Link to='/dashboard' className='noDec oLink navLink'>
                {/* <i className='fas fa-user' />{' '} */}
                <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!' className='noDec oLink navLink'>
                <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/recipes' className='noDec oLink navLink'>
                    Recipes
                </Link>
            </li>
            <li>
            <Link to="/register" className='noDec oLink navLink'>Register</Link>
            </li>
            <li>
                <Link to="/login" className='noDec oLink navLink'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
        <h1>
            <Link to= '/' className='noDec oLink'>
                <h1 id='navHeader'>
                    <i className="fas fa-pepper-hot"></i>&nbsp; 
                    Feastify
                </h1>
            </Link>
        </h1>
        { !loading && (<Fragment>
            { isAuthenticated ? authLinks : guestLinks }
        </Fragment>)}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps, 
    { logout }
    )(Navbar);