const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // could add profile picture?
});

const Users = mongoose.model('user', UsersSchema);
module.exports = Users;
