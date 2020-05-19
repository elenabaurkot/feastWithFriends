import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/landing.css';

const Landing = () => {
    return (
    <section className="landing">
        <div className="text">
            <section className='pic-text'>
                <p>Welcome to Feast With Friends</p>
                <p>A website where you can create a recipe book so you never forget how to make your favorite family foods and where you can checkout recipes of your friends and followers.</p>
                <Link to='#'>Sign In</Link>
                <Link to='#'>Sign Up</Link>
            </section>
        </div>
    </section>
    )
}

export default Landing