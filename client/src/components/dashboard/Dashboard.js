import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import GetMyRecipeBook from '../recipes/GetMyRecipeBook';
import './dashStyle.css';

const Dashboard = ({ 
    getCurrentProfile, 
    auth: { user }, 
    profile: {profile, loading} 
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? 
        <Spinner /> 
            : 
        <Fragment>
        <div className='sideNav'>
            <p className='text-dark'>
                    <span class='welcome'>
                    <i className='fas fa-user'></i>
                            <br/>
                        { user && user.name}
                    </span>
            </p>
        
            <Link to='/create-profile' className='btn'>
                Edit Profile
            </Link>
            <Link to='/create-recipe' className='btn'>
                Create Recipe
            </Link>
        </div>
        {/* Main Content */}
        <div class='header'>
            <h1 className='text-dark'>Dashboard</h1>
        </div>
        <div id='dash-recipes'>
            <GetMyRecipeBook />
        </div>
        </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps, { getCurrentProfile })(Dashboard);