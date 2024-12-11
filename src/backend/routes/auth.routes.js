const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');

router.post('/signup', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], authController.signup);

router.post('/signin', [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password').notEmpty().withMessage('Password is required')
], authController.signin);

module.exports = router; 