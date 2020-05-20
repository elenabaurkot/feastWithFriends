import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import { getProfileById } from '../../actions/profile';
import GetRecipesByUser from '../recipes/GetRecipesByUser';
import { getRecipesByUserId } from '../../actions/recipes';
import './profile.css';

const Profile = ({ 
    getProfileById, 
    profile: {profile, loading }, 
    auth, 
    match 
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id, getRecipesByUserId]);
    
    return (
    <Fragment>
        {profile === null || loading ? 
            <Spinner /> 
                : 
            <Fragment>
            <div className="center">
                <Link to='/profiles' className='btn btn-light'>
                    View All Profiles
                </Link>
                {auth.isAuthenticated && 
                auth.loading === false && 
                auth.user._id === profile.user._id && (
                <Link to='/create-profile' className='btn btn-dark'>
                    Edit Profile
                </Link>
                )}
                <div class='profile-grid my-1 center'>
                    <ProfileTop profile={profile}/> 
                </div>
                <div className='center mt-4'>
                    <GetRecipesByUser />
                </div>
            </div>
            </Fragment>
        }
    </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
