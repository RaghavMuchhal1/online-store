const jwt = require('jsonwebtoken');

// Authentication Middleware to Protect Routes
function authMiddleware(req, res, next) {
  try {
    // Get token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Split the token from the "Bearer" keyword
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    console.error('Auth middleware error:', err.message);

    // Check if the error is related to token expiration
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = { authMiddleware };
