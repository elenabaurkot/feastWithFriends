const Recipes = require('../models/Recipes');
const Users = require('../models/Users');
const { validationResult } = require('express-validator');

// Get current users recipes using the user ID
const getMyRecipeBook = async (req, res) => {
    try {
      const recipes = await Recipes.find({
        user: req.user.id,
      }).populate('user', ['name']).sort({ date: -1 });
      // if no recipe book send error message
      if (!recipes) {
        return res.status(400).json({ msg: 'This user does not have any recipes yet' });
      }
      // if there is a recipe book, send recipe book
      res.json(recipes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  };


// Create a recipe 
const addRecipe = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
    }
  
    const {
      name,
      category,
      ingredients,
      instructions
    } = req.body;
  
    // Build recipe object
    const recipeFields = {};
    recipeFields.user = req.user.id; 
    if (name) recipeFields.name = name;
    if (category) recipeFields.category = category;
    if (ingredients) {
        recipeFields.ingredients = ingredients.split(',').map(ingredient => ingredient.trim());
      }
    if (instructions) {
        recipeFields.instructions = instructions.split(',').map(ingredient => ingredient.trim());
      }
  
    try {
      // Create new recipe
      recipe = new Recipes(recipeFields); 
      await recipe.save();
      res.json(recipe);
  
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error'); 
    }
  };

// Get all recipes
const getAllRecipes = async(req, res) => {
    try {
      const recipes = await Recipes.find().populate('user', ['name']).sort({ date: -1 });
      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Get recipes by User ID
  const getRecipeByUserId = async(req, res) => {
    try {
      const recipe = await Recipes.find({ user: req.params.user_id}).populate('user', ['name']);
  
      if(!recipe) {
        return res.status(400).json({ msg: 'Recipe not found'})
      }
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        res.status(400).json({ msg: 'Recipe not found'})
      }
      res.status(500).send('Server error');
    }
  };

// Get recipe by ID
const getRecipeById = async(req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if(!recipe) {
      return res.status(400).json({ msg: 'Recipe not found'})
    }
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ msg: 'Recipe not found'})
    }
    res.status(500).send('Server error');
  }
};


// Delete recipe by Id 
const deleteRecipeById = async(req, res) => {
  try {
      const recipe = await Recipes.findById(req.params.id);

      if(!recipe) {
          return res.status(404).json({ msg: 'Recipe not found' });
      }
      // Check if user deleting post is the one who made it
      if(recipe.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
      }
      await recipe.remove(); 
      res.json({ msg: 'Recipe removed' });
  } catch (err) {
      console.error(err.message);
      if(err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Recipe not found' });
      }
      res.status(500).send('Server Error');
  }
}


// Like a recipe
const likeRecipe = async(req, res) => {
  try {
      const recipe = await Recipes.findById(req.params.id);

      // check if recipe has already been liked by this user
      if(recipe.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ msg: 'Recipe already liked' })
      }
      recipe.likes.unshift({ user: req.user.id });

      await recipe.save(); 
      res.json(recipe.likes);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
  }
}

// Unlike a recipe
const unlikeRecipe = async(req, res) => {
  try {
      const recipe = await Recipes.findById(req.params.id);

      // check if recipe has already been liked by this user
      if(recipe.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ msg: 'recipe has not yet been liked' })
      }
      // Get remove index
      const removeIndex = recipe.likes.map(like => like.user.toString()).indexOf(req.user.id);
      recipe.likes.splice(removeIndex, 1);

      await recipe.save(); 
      res.json(recipe.likes);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
  }
};

// Comment on a recipe
const commentOnRecipe = async(req, res) => {
  const errors = validationResult(req); 
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {   
      const user = await Users.findById(req.user.id).select('-password'); 
      const recipe = await Recipes.findById(req.params.id);

      const newComment = {
          text: req.body.text,
          name: user.name,
          user: req.user.id
      };

      recipe.comments.unshift(newComment);

      await recipe.save();

      res.json(recipe.comments); 
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};


// Delete comment
const deleteRecipeComment = async(req, res) => {
  try {
      const recipe = await Recipes.findById(req.params.id);

      // Pull out comment
      const comment = recipe.comments.find(comment => comment.id === req.params.comment_id);

      // Make sure comment exists
      if(!comment) {
          return res.status(404).json({ msg: 'Comment does not exist' });
      }

      // Make sure user deleting comment is the one who created it
      if(comment.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
      }

      // Get remove index
      const removeIndex = recipe.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
      recipe.comments.splice(removeIndex, 1);

      await recipe.save(); 
      res.json(recipe.comments);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
}


  module.exports = {
    getMyRecipeBook,
    addRecipe,
    getAllRecipes,
    getRecipeByUserId,
    getRecipeById,
    deleteRecipeById,
    likeRecipe,
    unlikeRecipe,
    commentOnRecipe,
    deleteRecipeComment
  };