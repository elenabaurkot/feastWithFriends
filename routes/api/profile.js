const router = require('express').Router();
const auth = require('../../middleware/auth');
const { getCurrentProfile, 
        createUpdateProfile, 
        getAllProfiles, 
        getProfileById, 
        deleteProfile} = require('../../controllers/profile-controller');

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.route('/me').get(auth, getCurrentProfile);

// @route       POST api/profile
// @desc        Create or update user profile
// @access      Private
router.route('/').post(auth, createUpdateProfile);

// @route       GET api/profile
// @desc        Get all profiles
// @access      Public
router.route('/').get(getAllProfiles);

// @route       GET api/profile/user/:user_id
// @desc        Get profile by user id
// @access      Public
router.route('/user/:user_id').get(getProfileById);

// @route       DELETE api/profile
// @desc        Delete profile, user and posts 
// @access      Private
router.route('/').delete(auth, deleteProfile);

module.exports = router;
