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
  };

  // Get all recipes
const getAllRecipes = async(req, res) => {
    try {
      const recipes = await Recipes.find().populate('user', ['name']);
      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Get profile by ID
  const getRecipeById = async(req, res) => {
    try {
      const recipe = await Recipes.findOne({ user: req.params.user_id}).populate('user', ['name']);
  
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
  
  // Delete recipes
const deleteRecipes = async(req, res) => {
    try {
      // Remove recipes
      await Recipes.findOneAndRemove({ user: req.user.id });
      
      res.json({ msg: 'Recipe deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  module.exports = {
    getRecipeBook,
    createUpdateRecipe,
    getAllRecipes,
    getRecipeById,
    deleteRecipes
  };