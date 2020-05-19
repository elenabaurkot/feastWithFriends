import React, { Fragment, useState } from 'react';
import { Link, Redirect } from  'react-router-dom'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';
import '../styles/loginRegister.css';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData; 

    const onChange = e => 
        setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in 
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return <Fragment>
    <section className="form-background">
        <form className='form' onSubmit={e => onSubmit(e)}>
        <h1 className='text-dark sign-header'>Sign In</h1>
            <div className="form-group">
                <input className='input-rounded'
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)}
                    required 
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    minLength="6"
                />
            </div>
            <input type="submit" className="btn" value="Login" />
        <p>
            Don't have an account? <Link to='/register' className='sign-link'>Sign Up</Link>
        </p>
        </form>
    </section>
    </Fragment>
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    { login }
)(Login);