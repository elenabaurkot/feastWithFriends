import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const CreateProfile = props => {
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        facebook: '',
        youtube: '',
        instagram: ''
    }); 

    const {
        bio,
        location,
        facebook,
        youtube,
        instagram
    } = formData; 

    const onChange = e => 
      setFormData({...formData, [e.target.name]: e.target.value });

    return (
    <Fragment>
        <form className="form">
        
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
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </Fragment> 
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile
