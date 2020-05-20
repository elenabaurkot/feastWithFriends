import React from "react";
import PropTypes from "prop-types";
import './profile.css';

const ProfileTop = ({
  profile: {
    location,
    bio,
    social,
    user: { name },
  },
}) => {
  return (
    <div className="profile-top bg-secondary p-2 center">
      <img
        className="round-img my-1"
        src="https://res.cloudinary.com/dsxuuory9/image/upload/v1589981524/random/propic_p4iyq1.png"
        alt=""
      />
      <h1 className="large">{name}</h1>
      <p>{location && <span>{location}</span>}</p>
      <p>{bio && <span>{bio}</span>}</p>
      <div className="icons my-1">
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        )}
        <div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
