const Recipes = require('../models/Recipes');
const Users = require('../models/Users');
const { validationResult } = require('express-validator');

// FIND USER PROFILE BASED ON ID
const getRecipeBook = async (req, res) => {
    try {
      const recipes = await Recipes.findOne({
        user: req.user.id,
      }).populate('user', ['name']);
      // if no recipe book send error message
      if (!recipes) {
        return res.status(400).json({ msg: 'This user does not have a recipe book' });
      }
      // if there is a recipe book, send recipe book
      res.json(recipes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  };


// CREATE/UPDATE USER RECIPEBOOKS
const createUpdateRecipe = async (req, res) => {
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
  
    // Build profile object
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
      let recipe = await Recipes.findOne({ user: req.user.id });
      // Update profile
      if(recipe){
        recipe = await Recipes.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: recipeFields}, 
          { new: true }
        );
        return res.json(recipe); 
      }
      // Create Profile
      recipe = new Recipes(recipeFields); 
      await recipe.save();
      res.json(recipe);
  
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error'); 
    }
  }


  module.exports = {
    getRecipeBook,
    createUpdateRecipe
  };