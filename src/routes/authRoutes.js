const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', (req, res, next) => {
    console.log('Received signup request:', req.body); // Log signup attempts
    next(); 
  }, authController.signup);
  
router.post('/login', (req, res, next) => {
    console.log('Received login request:', req.body.username, req.body.password); // Log login attempts (without password)
    next();
}, authController.login);

module.exports = router;
