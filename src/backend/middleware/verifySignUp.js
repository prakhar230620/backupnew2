const User = require("../models/user.model");

checkDuplicateEmail = (req, res, next) => {
  User.findByEmail(req.body.email, (err, user) => {
    if (err && err.kind !== "not_found") {
      res.status(500).send({
        message: "Error checking user email"
      });
      return;
    }

    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp; 