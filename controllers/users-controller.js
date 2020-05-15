const Users = require('../models/Users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// register Users
const registerUser = async (req, res) => {
  //  sends error message for invalid entries
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await Users.findOne({ email });
    if (user) {
      res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    // Create instance of new user
    user = new Users({
      name,
      email,
      password,
    });
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // Save user
    await user.save();
    // Return JSON Web Token
    res.send('Users route');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerUser,
};
