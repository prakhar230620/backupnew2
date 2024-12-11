const sql = require('../server');

const Subscription = function(subscription) {
  this.user_id = subscription.user_id;
  this.plan_id = subscription.plan_id;
  this.start_date = subscription.start_date;
  this.end_date = subscription.end_date;
  this.payment_status = subscription.payment_status || 'pending';
  this.payment_id = subscription.payment_id;
};

// Create new subscription
Subscription.create = (newSubscription, result) => {
  sql.query("INSERT INTO user_subscriptions SET ?", newSubscription, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newSubscription });
  });
};

// Get active subscription by user ID
Subscription.findActiveByUserId = (userId, result) => {
  sql.query(
    `SELECT us.*, sp.* 
     FROM user_subscriptions us 
     JOIN subscription_plans sp ON us.plan_id = sp.plan_id 
     WHERE us.user_id = ? AND us.end_date > NOW() 
     AND us.payment_status = 'completed'
     ORDER BY us.start_date DESC LIMIT 1`,
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

// Get all subscription plans
Subscription.getAllPlans = (result) => {
  sql.query("SELECT * FROM subscription_plans", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Update subscription status
Subscription.updateStatus = (subscriptionId, status, result) => {
  sql.query(
    "UPDATE user_subscriptions SET payment_status = ? WHERE subscription_id = ?",
    [status, subscriptionId],
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
      result(null, { subscriptionId: subscriptionId, status: status });
    }
  );
};

module.exports = Subscription; 