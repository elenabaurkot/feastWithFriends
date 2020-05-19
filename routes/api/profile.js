const router = require('express').Router();
const auth = require('../../middleware/auth');
const { getCurrentProfile, 
        createUpdateProfile, 
        getAllProfiles, 
        getProfileById, 
        deleteProfile,
        addRecipe,
        deleteRecipe } = require('../../controllers/profile-controller');
const { check } = require('express-validator');

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

// @route       PUT api/profile/recipe
// @desc        Add recipe to profile
// @access      Private
router.route('/recipe').put(
    [auth, [
    check('name', 'Recipe name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('ingredients', 'Ingredients are required').not().isEmpty(),
    check('instructions', 'Instructions are required').not().isEmpty()
    ]],
    addRecipe
);

// @route       DELETE api/profile/recipe/:recipe_id
// @desc        Delete recipe from profile 
// @access      Private
router.route('/recipe/:recipe_id').delete(auth, deleteRecipe);

module.exports = router;
