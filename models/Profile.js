const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  recipes: [
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      ingredients: {
        type: [String],
        required: true,
      },
      instructions: {
        type: [String],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      // add a field to be able to upload pic of final creation
      // upload pic of your masterpiece
    },
  ]
});

// Profile Picture here?

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
