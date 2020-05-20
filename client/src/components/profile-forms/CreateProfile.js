import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

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
      history.push('/dashboard');
    }

    return (
    <Fragment>
        <form className="form" onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
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
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment> 
    );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps, 
  {createProfile, getCurrentProfile}
  )(withRouter(CreateProfile));

