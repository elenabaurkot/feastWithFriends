const router = require('express').Router(); 
const auth = require('../../middleware/auth'); 
const { getRecipeBook, createUpdateRecipe } = require('../../controllers/recipes-controller');

// @route       GET api/recipes/me
// @desc        Get current user's recipes
// @access      Private
router.route('/me').get(auth, getRecipeBook);

// @route       POST api/recipes
// @desc        Create or update recipe
// @access      Private
router.route('/').post(auth, createUpdateRecipe);


module.exports = router;
