require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 8080,
};
