import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: {
    user: { _id, name },
    location
    // will have to add picture
}})=> {
    return (
        <div className="profile bg-light">
            <img src="https://res.cloudinary.com/dsxuuory9/image/upload/v1589981524/random/propic_p4iyq1.png" 
            alt='' 
            className="rounded"/>
            <div>
                <h2>{name}</h2>
                <p>{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
