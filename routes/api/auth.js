const router = require('express').Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const {
  authorizeUser,
  loginUser,
} = require('../../controllers/auth-controller');

// @route       GET api/auth
// @desc        Test route
// @access      Public
router.route('/').get(auth, authorizeUser);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router
  .route('/')
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    loginUser
  );

module.exports = router;
