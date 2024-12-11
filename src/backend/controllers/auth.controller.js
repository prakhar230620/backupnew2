const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const config = require('../config/auth.config');

exports.signup = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
      user_type: 'user'
    };

    console.log('Attempting to create user:', { ...user, password: '[HIDDEN]' });

    const result = await User.create(user);
    console.log('User created successfully:', result);
    
    res.status(201).send({
      message: "User registered successfully!",
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
        user_type: result.user_type
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send({
      message: err.message || "Some error occurred during registration."
    });
  }
};

exports.signin = async (req, res) => {
  try {
    console.log('Login attempt for email:', req.body.email);

    const user = await User.findByEmail(req.body.email);
    
    if (!user) {
      console.log('User not found with email:', req.body.email);
      return res.status(404).send({
        message: "User not found."
      });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      console.log('Invalid password for user:', req.body.email);
      return res.status(401).send({
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign(
      { id: user.user_id, user_type: user.user_type },
      config.secret,
      { expiresIn: 86400 } // 24 hours
    );

    console.log('Login successful for user:', req.body.email);

    res.status(200).send({
      id: user.user_id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      accessToken: token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send({
      message: err.message || "Some error occurred during login."
    });
  }
}; 