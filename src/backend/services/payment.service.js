const crypto = require('crypto');
const axios = require('axios');
const phonepeConfig = require('../config/phonepe.config');

class PaymentService {
  constructor() {
    this.merchantId = phonepeConfig.MERCHANT_ID;
    this.saltKey = phonepeConfig.SALT_KEY;
    this.saltIndex = phonepeConfig.SALT_INDEX;
    this.apiUrl = phonepeConfig.API_URL;
  }

  generateTransactionId() {
    return `NIR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  calculateChecksum(payload, saltKey) {
    const string = payload + '/pg/v1/pay' + saltKey;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    return sha256 + '###' + this.saltIndex;
  }

  async initiatePayment(amount, userId, subscriptionId, redirectUrl) {
    const transactionId = this.generateTransactionId();
    const merchantUserId = `MUID_${userId}`;
    
    const payload = {
      merchantId: this.merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: merchantUserId,
      amount: amount * 100, // Convert to paise
      redirectUrl: redirectUrl,
      redirectMode: 'POST',
      callbackUrl: `${process.env.API_URL}/api/payments/callback`,
      paymentInstrument: {
        type: 'PAY_PAGE'
      },
      merchantOrderId: subscriptionId.toString()
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const checksum = this.calculateChecksum(base64Payload, this.saltKey);

    try {
      const response = await axios.post(
        `${this.apiUrl}/pg/v1/pay`,
        {
          request: base64Payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
          }
        }
      );

      return {
        success: true,
        data: response.data,
        transactionId: transactionId
      };
    } catch (error) {
      console.error('PhonePe payment initiation error:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  async verifyPayment(merchantTransactionId) {
    const string = `/pg/v1/status/${this.merchantId}/${merchantTransactionId}` + this.saltKey;
    const checksum = crypto.createHash('sha256').update(string).digest('hex') + '###' + this.saltIndex;

    try {
      const response = await axios.get(
        `${this.apiUrl}/pg/v1/status/${this.merchantId}/${merchantTransactionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': this.merchantId
          }
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('PhonePe payment verification error:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Add new methods for subscription payments
  async processSubscriptionPayment(subscriptionId, amount, userId) {
    try {
      const transactionId = this.generateTransactionId();
      const redirectUrl = `${process.env.FRONTEND_URL}/subscription/payment/status`;

      const payload = {
        merchantId: this.merchantId,
        merchantTransactionId: transactionId,
        merchantUserId: `MUID_${userId}`,
        amount: amount * 100,
        redirectUrl: redirectUrl,
        redirectMode: 'POST',
        callbackUrl: `${process.env.API_URL}/api/payments/subscription/callback`,
        paymentInstrument: {
          type: 'PAY_PAGE'
        },
        subscriptionId: subscriptionId.toString()
      };

      // ... rest of the payment processing logic
    } catch (error) {
      throw new Error('Payment processing failed: ' + error.message);
    }
  }

  // Add method for brand promotion payments
  async processBrandPromotionPayment(promotionId, amount, userId) {
    // Similar to subscription payment but with different callback URL
  }
}

module.exports = new PaymentService(); 