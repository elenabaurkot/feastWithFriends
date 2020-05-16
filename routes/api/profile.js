// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { getProfile, createUpdateProfile} = require('../../controllers/profile-controller');

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.route('/me').get(auth, getProfile);

// @route       POST api/profile
// @desc        Create or update user profile
// @access      Private
router.route('/').post(auth, createUpdateProfile);


module.exports = router;
