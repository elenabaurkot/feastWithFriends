import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile, deleteAccount } from '../../actions/profile';
import './form.css';

const initialState = {
  bio: '',
  location: '',
  facebook: '',
  youtube: '',
  instagram: ''
};

const CreateProfile = ({ 
  profile: { profile, loading },
  createProfile, 
  getCurrentProfile,
  deleteAccount,
  history 
}) => {
    const [formData, setFormData] = useState(initialState); 

    useEffect(() => {
      if (!profile) getCurrentProfile();
      if (!loading && profile) {
        const profileData = { ...initialState };
        for (const key in profile) {
          if (key in profileData) profileData[key] = profile[key];
        }
        for (const key in profile.social) {
          if (key in profileData) profileData[key] = profile.social[key];
        }
        setFormData(profileData);
      }
    }, [loading, getCurrentProfile, profile]);

    const {
        bio,
        location,
        facebook,
        youtube,
        instagram
    } = formData; 

    const onChange = e => 
      setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history, profile ? true : false);
      // history.push('/dashboard');
    }

    return (
    <Fragment>
        <form className="form" id="prof-form" onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
          <h2 className='mb-4 pt-5'>Update Your Profile</h2>
          <textarea 
            placeholder="A short bio of yourself" 
            name="bio"
            value={bio} 
            onChange={e => onChange(e)}>
          </textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="form-group">
          <input 
            type="text" 
            placeholder="Location" 
            name="location"
            value={location} 
            onChange={e => onChange(e)}
          />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input 
            type="text" 
            placeholder="Facebook URL" 
            name="facebook"
            value={facebook} 
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input 
            type="text" 
            placeholder="YouTube URL" 
            name="youtube"
            value={youtube} 
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input 
            type="text" 
            placeholder="Instagram URL" 
            name="instagram"
            value={instagram} 
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn my-1" />
        <Link className="btn my-1" to="/dashboard">Go Back</Link>
        {/* Delete account button */}
        <div className='my-1'>
          <button className='btn' onClick={() => deleteAccount()}>
            <i className='fas fa-user'></i>&nbsp;Delete My Account
          </button>
        </div>
      </form>
    </Fragment> 
    );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps, 
  {createProfile, getCurrentProfile, deleteAccount}
  )(withRouter(CreateProfile));

