const Package = require('../models/package.model');
const PaymentService = require('../services/payment.service');

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.getAll();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.subscribeToPackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const userId = req.userId;

    // Get package details
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Create subscription
    const subscription = await Package.createSubscription({
      userId,
      packageId,
      amount: package.price
    });

    // Initiate payment
    const paymentResponse = await PaymentService.initiatePayment(
      subscription.id,
      package.price,
      userId
    );

    res.json({
      subscriptionId: subscription.id,
      paymentUrl: paymentResponse.paymentUrl,
      transactionId: paymentResponse.transactionId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.handlePaymentCallback = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    // Verify payment status
    const paymentVerification = await PaymentService.verifyPayment(transactionId);
    if (paymentVerification.success) {
      await Package.updateSubscriptionStatus(
        paymentVerification.subscriptionId,
        'completed'
      );
      res.json({ message: "Payment successful" });
    } else {
      await Package.updateSubscriptionStatus(
        paymentVerification.subscriptionId,
        'failed'
      );
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 