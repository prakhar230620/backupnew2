const Brand = require('../models/brand.model');
const uploadService = require('../services/upload.service');
const emailService = require('../services/email.service');
const PaymentService = require('../services/payment.service');

// Create new brand promotion
exports.create = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Handle media uploads (5 photos and 1 video)
    let mediaFiles = [];
    if (req.files) {
      const photos = req.files.photos || [];
      const video = req.files.video ? [req.files.video[0]] : [];
      
      mediaFiles = await Promise.all([
        ...photos.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...video.map(async file => ({
          type: 'video',
          url: (await uploadService.uploadFile(file)).url
        }))
      ]);
    }

    const promotion = new Brand({
      user_id: req.userId,
      company_name: req.body.company_name,
      description: req.body.description,
      website: req.body.website,
      plan_id: req.body.plan_id,
      start_date: new Date(),
      end_date: new Date(Date.now() + (req.body.duration_days * 24 * 60 * 60 * 1000))
    });

    Brand.create(promotion, mediaFiles, async (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the promotion."
        });
      } else {
        // Send email notification
        await emailService.sendPromotionNotification(
          process.env.COMPANY_EMAIL,
          data
        );
        res.send(data);
      }
    });
  } catch (error) {
    console.error('Promotion creation error:', error);
    res.status(500).send({
      message: "Error creating promotion"
    });
  }
};

// Get all active promotions
exports.getActivePromotions = (req, res) => {
  Brand.getActivePromotions((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving active promotions"
      });
    } else {
      res.send(data);
    }
  });
};

// Get user's promotions
exports.getUserPromotions = (req, res) => {
  Brand.getByUserId(req.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving promotions"
      });
    } else {
      res.send(data);
    }
  });
};

// Initiate payment for promotion
exports.initiatePayment = async (req, res) => {
  try {
    const { promotionId, amount } = req.body;
    const redirectUrl = `${process.env.FRONTEND_URL}/brand-promotion/payment/status`;

    const result = await PaymentService.initiatePayment(
      amount,
      req.userId,
      promotionId,
      redirectUrl
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ message: result.error });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ message: 'Error initiating payment' });
  }
};

// Handle payment callback
exports.handlePaymentCallback = async (req, res) => {
  try {
    const { merchantTransactionId } = req.body;
    
    const result = await PaymentService.verifyPayment(merchantTransactionId);
    
    if (result.success && result.data.code === 'PAYMENT_SUCCESS') {
      await Brand.updatePaymentStatus(
        result.data.merchantOrderId,
        'completed',
        merchantTransactionId
      );
      
      res.redirect(`${process.env.FRONTEND_URL}/brand-promotion/success`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/brand-promotion/failure`);
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/brand-promotion/failure`);
  }
};

// Admin: Get all promotions
exports.getAllPromotions = (req, res) => {
  Brand.getAllForAdmin((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving promotions"
      });
    } else {
      res.send(data);
    }
  });
};

// Admin: Update promotion status
exports.updateStatus = (req, res) => {
  Brand.updateStatus(
    req.params.promotionId,
    req.body.status,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Promotion not found with id ${req.params.promotionId}`
          });
          return;
        }
        res.status(500).send({
          message: "Error updating promotion status"
        });
        return;
      }
      res.send(data);
    }
  );
}; 