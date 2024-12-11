const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const config = require('../config/auth.config');

exports.signup = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password
  });

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    } else {
      res.send(data);
    }
  });
};

exports.signin = (req, res) => {
  User.findByEmail(req.body.email, async (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with email ${req.body.email}.`
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving user"
      });
      return;
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      res.status(401).send({
        message: "Invalid Password!"
      });
      return;
    }

    const token = jwt.sign({ id: user.user_id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      accessToken: token
    });
  });
}; 