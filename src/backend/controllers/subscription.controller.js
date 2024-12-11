const Subscription = require('../models/subscription.model');
const { calculateEndDate } = require('../utils/dateUtils');

exports.createSubscription = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const subscription = new Subscription({
    user_id: req.userId,
    plan_id: req.body.plan_id,
    start_date: new Date(),
    end_date: calculateEndDate(req.body.duration_days),
    payment_status: 'pending'
  });

  Subscription.create(subscription, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the subscription."
      });
    } else {
      res.send(data);
    }
  });
};

exports.getActiveSubscription = (req, res) => {
  Subscription.findActiveByUserId(req.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "No active subscription found"
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving subscription"
      });
      return;
    }
    res.send(data);
  });
};

exports.getAllPlans = (req, res) => {
  Subscription.getAllPlans((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plans."
      });
    } else {
      res.send(data);
    }
  });
};

exports.updatePaymentStatus = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Subscription.updateStatus(
    req.params.subscriptionId,
    req.body.status,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Subscription not found with id ${req.params.subscriptionId}.`
          });
          return;
        }
        res.status(500).send({
          message: "Error updating subscription status"
        });
        return;
      }
      res.send(data);
    }
  );
}; 