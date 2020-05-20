const Recipes = require('../models/Recipes');
const Users = require('../models/Users');
const { validationResult } = require('express-validator');

// Get current users recipes using the user ID
const getMyRecipeBook = async (req, res) => {
    try {
      const recipes = await Recipes.find({
        user: req.user.id,
      }).populate('user', ['name']);
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




  module.exports = {
    getMyRecipeBook,
    addRecipe,
    getAllRecipes,
    getRecipeByUserId,
    getRecipeById,
    deleteRecipeById
  };

//     // Delete recipes
// const deleteRecipeById = async(req, res) => {
//   try {
//     // Remove recipes
//     await Recipes.findOneAndRemove({ user: req.user.id });
    
//     res.json({ msg: 'Recipe deleted'});
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };


// // Delete Recipe
// const deleteRecipeById = async(req, res) => {
// try {
//   // get profile by user id
//   const recipes = await Recipes.findOne({ user: req.user.id });
//   // get remove index
//   const removeIndex = recipes.recipes.map(item => item.id).indexOf(req.params.recipe_id);
  
//   recipes.recipes.splice(removeIndex, 1);

//   await recipes.save(); 
//   res.json(recipes);
// } catch (err) {
//   console.error(err.message);
//   res.status(500).send('Server Error'); 
// }
// }