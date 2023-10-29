const jwt = require('jsonwebtoken');
const config = require('../config/keys');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token is not valid' });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Access Denied, No Token' });
  }
};
