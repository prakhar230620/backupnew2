const PaymentService = require('../services/payment.service');
const Subscription = require('../models/subscription.model');

exports.initiatePayment = async (req, res) => {
  try {
    const { amount, subscriptionId } = req.body;
    const redirectUrl = `${process.env.FRONTEND_URL}/payment/status`;

    const result = await PaymentService.initiatePayment(
      amount,
      req.userId,
      subscriptionId,
      redirectUrl
    );

    if (result.success) {
      // Save transaction details to database
      // Update subscription payment_id
      res.json(result.data);
    } else {
      res.status(400).json({ message: result.error });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ message: 'Error initiating payment' });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    const { merchantTransactionId } = req.body;
    
    const result = await PaymentService.verifyPayment(merchantTransactionId);
    
    if (result.success && result.data.code === 'PAYMENT_SUCCESS') {
      // Update subscription status
      await Subscription.updateStatus(
        result.data.merchantOrderId,
        'completed'
      );
      
      res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
  }
}; 