import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/landing.css';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
       return <Redirect to='/dashboard' />;
    }

    return (
    <section className="landing">
        <div className="text">
            <section className='pic-text'>
                <h1 id='welcome-header' className='text-dark'>
                    Welcome to Feastify
                </h1>
                <p id='welcome-text' className='text-dark'>
                    A place where you can create your own virtual recipe book so you never forget how to make your favorite family foods. Check out recipe books of friends and other users to get new meal ideas!
                </p>
                <Link to='/login' className='welcome-link' id='bold-link'>
                    Login
                </Link>
                <Link to='/register' className='welcome-link'>
                    Sign Up
                </Link>
                    <br />
                <i class="fas fa-pepper-hot" id='welcome-pepper'></i>
            </section>
        </div>
    </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)