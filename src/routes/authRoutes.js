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

// Route to refresh access token using refresh token
// (This route should be protected and only accessible with a valid refresh token)
router.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log('Received refresh token request:', req.body.username, req.body.password); // Log login attempts (without password)

    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided.' });
  
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  
      // Generate new access token
      const newAccessToken = generateAccessToken(decoded.userId);
  
      res.json({ accessToken: newAccessToken });
  
    } catch (ex) {
      // Refresh token is invalid or expired
      res.status(401).json({ message: 'Invalid refresh token.' });
    }
  });

module.exports = router;
