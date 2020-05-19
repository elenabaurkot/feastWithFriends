import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/landing.css';

const Landing = () => {
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

export default Landing