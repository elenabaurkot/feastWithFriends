const router = require('express').Router(); 
const auth = require('../../middleware/auth'); 
const { getRecipeBook, createUpdateRecipe, getAllRecipes, getRecipeById } = require('../../controllers/recipes-controller');

// @route       GET api/recipes/me
// @desc        Get current user's recipes
// @access      Private
router.route('/me').get(auth, getRecipeBook);

// @route       POST api/recipes
// @desc        Create or update recipe
// @access      Private
router.route('/').post(auth, createUpdateRecipe);

// @route       GET api/recipes
// @desc        Get all recipes
// @access      Public
router.route('/').get(getAllRecipes);

// @route       GET api/recipes/user/:user_id
// @desc        Get recipe by user id
// @access      Public
router.route('/user/:user_id').get(getRecipeById);

module.exports = router;
