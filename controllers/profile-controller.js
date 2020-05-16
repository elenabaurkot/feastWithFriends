const Profile = require('../models/Profile');
const Users = require('../models/Users');
const { validationResult } = require('express-validator');

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    // if no profile send error message
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    // if there is a profile, send profile
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

// Create or update user profile
const createUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }

  const {
    location,
    bio,
    youtube,
    facebook,
    twitter,
    instagram,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id; 
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;

  // Build social object
  profileFields.social = {}; 
  if (youtube) profileFields.social.youtube = youtube; 
  if (twitter) profileFields.social.twitter = twitter; 
  if (facebook) profileFields.social.facebook = facebook; 
  if (instagram) profileFields.social.instagram = instagram; 

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // Update profile
    if(profile){
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id }, 
        { $set: profileFields}, 
        { new: true }
      );
      return res.json(profile); 
    }
    // Create Profile
    profile = new Profile(profileFields); 
    await profile.save();
    res.json(profile);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
}

module.exports = {
  getProfile,
  createUpdateProfile
};