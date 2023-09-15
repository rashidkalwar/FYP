require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
  port: process.env.PORT || 8080,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
