const sql = require('../server');
const bcrypt = require('bcryptjs');

const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.mobile = user.mobile;
  this.password = user.password;
  this.user_type = user.user_type || 'user';
};

User.create = async (newUser, result) => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const query = "INSERT INTO users SET ?";
    sql.query(query, newUser, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newUser });
    });
  } catch (err) {
    console.log("Error: ", err);
    result(err, null);
  }
};

User.findByEmail = (email, result) => {
  sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

User.findById = (userId, result) => {
  sql.query(
    `SELECT user_id, name, email, mobile, user_type, created_at 
     FROM users WHERE user_id = ?`, 
    userId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

User.updateById = (userId, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, mobile = ? WHERE user_id = ?",
    [user.name, user.mobile, userId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { userId: userId, ...user });
    }
  );
};

// Add more methods as needed

module.exports = User; 