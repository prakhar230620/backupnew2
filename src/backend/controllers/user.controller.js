const User = require('../models/user.model');

exports.getProfile = (req, res) => {
  User.findById(req.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.userId}.`
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving user profile"
      });
      return;
    }
    res.send(data);
  });
};

exports.updateProfile = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  User.updateById(
    req.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `User not found with id ${req.userId}.`
          });
          return;
        }
        res.status(500).send({
          message: "Error updating user profile"
        });
        return;
      }
      res.send(data);
    }
  );
}; 