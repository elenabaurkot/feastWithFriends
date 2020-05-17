const Profile = require('../models/Profile');
const Users = require('../models/Users');
const { validationResult } = require('express-validator');

// FIND USER PROFILE BASED ON ID
const getCurrentProfile = async (req, res) => {
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



// CREATE/UPDATE USER PROFILES
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
};

// Get all profiles
const getAllProfiles = async(req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get profile by ID
const getProfileById = async(req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'Profile not found'})
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ msg: 'Profile not found'})
    }
    res.status(500).send('Server error');
  }
};

module.exports = {
  getCurrentProfile,
  createUpdateProfile,
  getAllProfiles,
  getProfileById
};