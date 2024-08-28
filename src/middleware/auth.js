const jwt = require('jsonwebtoken');
console.log("En el middleware/auth.js");
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
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
