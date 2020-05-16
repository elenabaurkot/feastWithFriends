const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
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
