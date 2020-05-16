const router = require('express').Router();
const auth = require('../../middleware/auth');
const { getCurrentProfile, createUpdateProfile} = require('../../controllers/profile-controller');

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.route('/me').get(auth, getCurrentProfile);

// @route       POST api/profile
// @desc        Create or update user profile
// @access      Private
router.route('/').post(auth, createUpdateProfile);


module.exports = router;
