const router = require('express').Router(); 
const auth = require('../../middleware/auth'); 
const { getMyRecipeBook, 
        addRecipe, 
        getAllRecipes, 
        getRecipeByUserId,
        getRecipeById,
        deleteRecipeById,
        likeRecipe,
        unlikeRecipe,
        commentOnRecipe,
        deleteRecipeComment } = require('../../controllers/recipes-controller');
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

// @route       POST api/recipes/like/:id
// @desc        Like a recipe
// @access      Private
router.route('/like/:id').put(auth, likeRecipe);

// @route       POST api/recipes/unlike/:id
// @desc        Unlike a recipe
// @access      Private
router.route('/unlike/:id').put(auth, unlikeRecipe);

// @route       POST api/recipes/comment/:id
// @desc        Comment on a recipe
// @access      Private
router.route('/comment/:id').post(
    [auth, [
        check('text', 'Text is required').not().isEmpty()
    ]],
    commentOnRecipe
);

// @route       DELETE api/recipes/comment/:id/:comment_id
// @desc        Delete a comment from recipe
// @access      Private
router.route('/comment/:id/:comment_id').delete(auth, deleteRecipeComment);




module.exports = router;
