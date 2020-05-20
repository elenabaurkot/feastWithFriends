const router = require('express').Router(); 
const auth = require('../../middleware/auth'); 
const { getMyRecipeBook, 
        addRecipe, 
        getAllRecipes, 
        getRecipeByUserId,
        getRecipeById,
        deleteRecipeById } = require('../../controllers/recipes-controller');
const { check } = require('express-validator');

// @route       GET api/recipes/me
// @desc        Get current user's recipes
// @access      Private
router.route('/me').get(auth, getMyRecipeBook);

// @route       POST api/recipes
// @desc        Create recipe
// @access      Private
router.route('/').post(auth, addRecipe);

// @route       GET api/recipes
// @desc        Get all recipes
// @access      Public
router.route('/').get(getAllRecipes);

// @route       GET api/recipes/user/:user_id
// @desc        Get recipe by user id
// @access      Public
router.route('/user/:user_id').get(auth, getRecipeByUserId);

// @route       GET api/recipes/:id
// @desc        Get recipe by recipe id
// @access      Public
router.route('/:id').get(auth, getRecipeById);

// @route       PUT api/recipes/recipe
// @desc        Add recipe
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

// @route       DELETE api/recipes/:id
// @desc        Delete a recipe
// @access      Private
router.route('/:id').delete(auth, deleteRecipeById);



module.exports = router;
