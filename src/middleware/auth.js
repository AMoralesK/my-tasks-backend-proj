const jwt = require('jsonwebtoken');
console.log("En el middleware/auth.js");

// Function to generate access token
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '3m', // Access token expires in 15 minutes
    });
  };
  
  // Function to generate refresh token
  const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d', // Refresh token expires in 7 days (example)
    });
  };

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    console.log("Revisando los tokens");
    console.log(token, process.env.JWT_SECRET);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (ex) {
        if (ex.name === 'TokenExpiredError') {
            // Handle token expiration (potentially with refresh token)
            return res.status(401).json({ message: 'Token expired.', expiredAt: ex.expiredAt });
          }
          res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
