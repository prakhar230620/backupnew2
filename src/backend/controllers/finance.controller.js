const Finance = require('../models/finance.model');
const uploadService = require('../services/upload.service');
const emailService = require('../services/email.service');

// Calculate EMI
exports.calculateEMI = (req, res) => {
  const { principal, rate, tenure } = req.body;

  if (!principal || !rate || !tenure) {
    res.status(400).send({
      message: "Principal amount, interest rate and tenure are required!"
    });
    return;
  }

  const result = Finance.calculateEMI(
    parseFloat(principal),
    parseFloat(rate),
    parseFloat(tenure)
  );

  res.send(result);
};

// Submit loan application
exports.submitApplication = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Handle document uploads
    let documents = [];
    if (req.files && req.files.length > 0) {
      documents = await Promise.all(
        req.files.map(async (file) => {
          const uploadResult = await uploadService.uploadFile(file);
          return {
            type: file.fieldname, // aadhar_front, aadhar_back, pan_card, photo
            url: uploadResult.url
          };
        })
      );
    }

    const application = new Finance({
      user_id: req.userId,
      ...req.body
    });

    Finance.create(application, documents, async (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while submitting application."
        });
      } else {
        // Send email notification
        await emailService.sendApplicationNotification(
          process.env.COMPANY_EMAIL,
          data
        );
        res.send(data);
      }
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).send({
      message: "Error submitting application"
    });
  }
};

// Get user's applications
exports.getUserApplications = (req, res) => {
  Finance.getByUserId(req.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving applications"
      });
    } else {
      res.send(data);
    }
  });
};

// Get application details
exports.getApplicationDetails = (req, res) => {
  Finance.findById(req.params.applicationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Application not found with id ${req.params.applicationId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving application"
      });
      return;
    }
    res.send(data);
  });
};

// Get loan types
exports.getLoanTypes = (req, res) => {
  Finance.getLoanTypes((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving loan types"
      });
    } else {
      res.send(data);
    }
  });
}; 