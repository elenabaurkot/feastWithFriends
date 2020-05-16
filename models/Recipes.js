const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  instructions: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // add a field to be able to upload pic of final creation
  //   upload pic of your masterpiece
});

const Recipes = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipes;
