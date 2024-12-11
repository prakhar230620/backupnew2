const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendApplicationNotification(to, data) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: 'New Application Received',
      html: `
        <h2>New Application Details</h2>
        <p><strong>Name:</strong> ${data.full_name}</p>
        <p><strong>Type:</strong> ${data.loan_type}</p>
        <p><strong>Amount:</strong> ${data.amount}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendPromotionNotification(to, data) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: 'New Brand Promotion Request',
      html: `
        <h2>New Promotion Request Details</h2>
        <p><strong>Company:</strong> ${data.company_name}</p>
        <p><strong>Website:</strong> ${data.website}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    return this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService(); 